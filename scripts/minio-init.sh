#!/bin/bash
# MinIO Initialization Script for Sochi Travel
# This script sets up MinIO buckets and policies

set -euo pipefail

# Wait for MinIO to be ready
echo "Waiting for MinIO to be ready..."
until curl -f http://localhost:9000/minio/health/live; do
    echo "MinIO is not ready yet, waiting..."
    sleep 5
done

echo "MinIO is ready, setting up buckets..."

# Set up MinIO client
mc alias set local http://localhost:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD

# Create buckets
echo "Creating buckets..."
mc mb local/sochi-travel-uploads --ignore-existing
mc mb local/sochi-travel-backups --ignore-existing
mc mb local/sochi-travel-temp --ignore-existing

# Set bucket policies
echo "Setting bucket policies..."
mc anonymous set public local/sochi-travel-uploads
mc anonymous set public local/sochi-travel-temp

# Create bucket for backups (private)
mc anonymous set none local/sochi-travel-backups

# Set up lifecycle policies
echo "Setting up lifecycle policies..."
cat > /tmp/lifecycle.json << 'EOF'
{
    "Rules": [
        {
            "ID": "temp-cleanup",
            "Status": "Enabled",
            "Filter": {
                "Prefix": "temp/"
            },
            "Expiration": {
                "Days": 7
            }
        },
        {
            "ID": "backup-retention",
            "Status": "Enabled",
            "Filter": {
                "Prefix": "backups/"
            },
            "Expiration": {
                "Days": 30
            }
        }
    ]
}
EOF

mc ilm import local/sochi-travel-temp < /tmp/lifecycle.json
mc ilm import local/sochi-travel-backups < /tmp/lifecycle.json

# Create admin user policy
echo "Creating admin policy..."
cat > /tmp/admin-policy.json << 'EOF'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": [
                "arn:aws:s3:::*"
            ]
        }
    ]
}
EOF

mc admin policy create local admin-policy /tmp/admin-policy.json

# Create read-only user policy
echo "Creating read-only policy..."
cat > /tmp/readonly-policy.json << 'EOF'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::*"
            ]
        }
    ]
}
EOF

mc admin policy create local readonly-policy /tmp/readonly-policy.json

# Create service user
echo "Creating service user..."
mc admin user add local sochi-service SochiTravel2025!ServicePassword
mc admin policy attach local admin-policy --user sochi-service

# Create read-only user
echo "Creating read-only user..."
mc admin user add local sochi-readonly SochiTravel2025!ReadOnlyPassword
mc admin policy attach local readonly-policy --user sochi-readonly

# Set up CORS
echo "Setting up CORS..."
cat > /tmp/cors.json << 'EOF'
{
    "CORSRules": [
        {
            "AllowedOrigins": ["*"],
            "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "HEAD"],
            "AllowedHeaders": ["*"],
            "ExposeHeaders": ["ETag"],
            "MaxAgeSeconds": 3000
        }
    ]
}
EOF

mc anonymous set-json local/sochi-travel-uploads /tmp/cors.json

# Create initial folder structure
echo "Creating folder structure..."
mc cp /dev/null local/sochi-travel-uploads/tours/
mc cp /dev/null local/sochi-travel-uploads/hotels/
mc cp /dev/null local/sochi-travel-uploads/services/
mc cp /dev/null local/sochi-travel-uploads/promotions/
mc cp /dev/null local/sochi-travel-uploads/hero/

# Clean up
rm -f /tmp/lifecycle.json /tmp/admin-policy.json /tmp/readonly-policy.json /tmp/cors.json

echo "MinIO setup completed successfully!"
echo "Buckets created:"
mc ls local
echo ""
echo "Users created:"
mc admin user list local
echo ""
echo "Policies created:"
mc admin policy list local
