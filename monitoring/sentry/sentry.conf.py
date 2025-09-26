# Sentry Configuration for Sochi Travel
import os
import sentry_sdk
from sentry_sdk.integrations.express import ExpressIntegration
from sentry_sdk.integrations.node import NodeIntegration
from sentry_sdk.integrations.http import HttpIntegration
from sentry_sdk.integrations.console import ConsoleIntegration

# Sentry DSN from environment
SENTRY_DSN = os.getenv('SENTRY_DSN')

if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[
            ExpressIntegration(),
            NodeIntegration(),
            HttpIntegration(),
            ConsoleIntegration(),
        ],
        # Performance Monitoring
        traces_sample_rate=0.1,
        # Error Sampling
        sample_rate=1.0,
        # Environment
        environment=os.getenv('NODE_ENV', 'development'),
        # Release
        release=os.getenv('API_VERSION', '1.0.0'),
        # Server Name
        server_name=os.getenv('HOSTNAME', 'sochi-travel-api'),
        # Tags
        before_send=lambda event, hint: event,
        # User Context
        send_default_pii=False,
        # Breadcrumbs
        max_breadcrumbs=50,
        # Attachments
        attach_stacktrace=True,
        # Debug
        debug=os.getenv('NODE_ENV') === 'development',
    )
