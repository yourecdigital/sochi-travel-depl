const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Путь к базе данных
const dbPath = path.join(__dirname, 'database.sqlite');

// Создаем подключение к базе данных
const db = new sqlite3.Database(dbPath);

// Популярные страны и туры
const foreignTours = [
  // Италия
  {
    name: 'Рим - Вечный город',
    description: 'Классический тур по Риму с посещением Колизея, Ватикана и других достопримечательностей',
    price: 85000,
    country: 'Италия',
    duration: '7 дней / 6 ночей',
    category: 'Экскурсионный',
    highlights: JSON.stringify(['Колизей', 'Ватикан', 'Фонтан Треви', 'Пантеон']),
    image_url: '/uploads/italy-rome.jpg',
    available: true
  },
  {
    name: 'Венеция - город на воде',
    description: 'Романтический тур по Венеции с прогулками на гондолах',
    price: 92000,
    country: 'Италия',
    duration: '5 дней / 4 ночи',
    category: 'Романтический',
    highlights: JSON.stringify(['Площадь Сан-Марко', 'Гондолы', 'Мост Риальто', 'Мурано']),
    image_url: '/uploads/italy-venice.jpg',
    available: true
  },
  {
    name: 'Флоренция - колыбель Возрождения',
    description: 'Культурный тур по Флоренции с посещением музеев и галерей',
    price: 78000,
    country: 'Италия',
    duration: '6 дней / 5 ночей',
    category: 'Культурный',
    highlights: JSON.stringify(['Галерея Уффици', 'Собор Санта-Мария-дель-Фьоре', 'Понте Веккьо']),
    image_url: '/uploads/italy-florence.jpg',
    available: true
  },

  // Франция
  {
    name: 'Париж - город любви',
    description: 'Классический тур по Парижу с посещением Эйфелевой башни и Лувра',
    price: 95000,
    country: 'Франция',
    duration: '7 дней / 6 ночей',
    category: 'Романтический',
    highlights: JSON.stringify(['Эйфелева башня', 'Лувр', 'Нотр-Дам', 'Монмартр']),
    image_url: '/uploads/france-paris.jpg',
    available: true
  },
  {
    name: 'Ницца - Лазурный берег',
    description: 'Пляжный отдых на Лазурном берегу Франции',
    price: 88000,
    country: 'Франция',
    duration: '8 дней / 7 ночей',
    category: 'Пляжный',
    highlights: JSON.stringify(['Променад дез Англе', 'Старый город', 'Монте-Карло']),
    image_url: '/uploads/france-nice.jpg',
    available: true
  },

  // Испания
  {
    name: 'Барселона - архитектура Гауди',
    description: 'Тур по Барселоне с посещением шедевров Антонио Гауди',
    price: 82000,
    country: 'Испания',
    duration: '6 дней / 5 ночей',
    category: 'Архитектурный',
    highlights: JSON.stringify(['Саграда Фамилия', 'Парк Гуэль', 'Каса Батльо', 'Ла Рамбла']),
    image_url: '/uploads/spain-barcelona.jpg',
    available: true
  },
  {
    name: 'Мадрид - столица Испании',
    description: 'Культурный тур по Мадриду с посещением музеев',
    price: 76000,
    country: 'Испания',
    duration: '5 дней / 4 ночи',
    category: 'Культурный',
    highlights: JSON.stringify(['Прадо', 'Королевский дворец', 'Пласа Майор']),
    image_url: '/uploads/spain-madrid.jpg',
    available: true
  },

  // Германия
  {
    name: 'Берлин - современная столица',
    description: 'Тур по современному Берлину с историческими достопримечательностями',
    price: 72000,
    country: 'Германия',
    duration: '6 дней / 5 ночей',
    category: 'Исторический',
    highlights: JSON.stringify(['Бранденбургские ворота', 'Берлинская стена', 'Рейхстаг']),
    image_url: '/uploads/germany-berlin.jpg',
    available: true
  },
  {
    name: 'Мюнхен - столица Баварии',
    description: 'Тур по Мюнхену с посещением замков и пивных садов',
    price: 68000,
    country: 'Германия',
    duration: '5 дней / 4 ночи',
    category: 'Гастрономический',
    highlights: JSON.stringify(['Октоберфест', 'Нойшванштайн', 'Мариенплац']),
    image_url: '/uploads/germany-munich.jpg',
    available: true
  },

  // Турция
  {
    name: 'Стамбул - город двух континентов',
    description: 'Тур по Стамбулу с посещением мечетей и дворцов',
    price: 65000,
    country: 'Турция',
    duration: '7 дней / 6 ночей',
    category: 'Экзотический',
    highlights: JSON.stringify(['Айя-София', 'Голубая мечеть', 'Топкапы', 'Босфор']),
    image_url: '/uploads/turkey-istanbul.jpg',
    available: true
  },
  {
    name: 'Анталья - турецкая ривьера',
    description: 'Пляжный отдых на турецкой ривьере',
    price: 58000,
    country: 'Турция',
    duration: '10 дней / 9 ночей',
    category: 'Пляжный',
    highlights: JSON.stringify(['Старый город', 'Водопады Дюден', 'Курортные зоны']),
    image_url: '/uploads/turkey-antalya.jpg',
    available: true
  },

  // Греция
  {
    name: 'Афины - колыбель демократии',
    description: 'Классический тур по Афинам с посещением Акрополя',
    price: 75000,
    country: 'Греция',
    duration: '6 дней / 5 ночей',
    category: 'Исторический',
    highlights: JSON.stringify(['Акрополь', 'Парфенон', 'Агора', 'Плака']),
    image_url: '/uploads/greece-athens.jpg',
    available: true
  },
  {
    name: 'Санторини - остров вулканов',
    description: 'Романтический отдых на острове Санторини',
    price: 98000,
    country: 'Греция',
    duration: '8 дней / 7 ночей',
    category: 'Романтический',
    highlights: JSON.stringify(['Ойя', 'Фира', 'Вулканические пляжи', 'Закаты']),
    image_url: '/uploads/greece-santorini.jpg',
    available: true
  },

  // Таиланд
  {
    name: 'Бангкок - город ангелов',
    description: 'Экзотический тур по Бангкоку с посещением храмов',
    price: 68000,
    country: 'Таиланд',
    duration: '7 дней / 6 ночей',
    category: 'Экзотический',
    highlights: JSON.stringify(['Храм Изумрудного Будды', 'Большой дворец', 'Плавучий рынок']),
    image_url: '/uploads/thailand-bangkok.jpg',
    available: true
  },
  {
    name: 'Пхукет - райский остров',
    description: 'Пляжный отдых на острове Пхукет',
    price: 72000,
    country: 'Таиланд',
    duration: '10 дней / 9 ночей',
    category: 'Пляжный',
    highlights: JSON.stringify(['Пляж Патонг', 'Остров Пхи-Пхи', 'Биг Будда']),
    image_url: '/uploads/thailand-phuket.jpg',
    available: true
  },

  // Япония
  {
    name: 'Токио - город будущего',
    description: 'Современный тур по Токио с элементами традиционной культуры',
    price: 120000,
    country: 'Япония',
    duration: '8 дней / 7 ночей',
    category: 'Технологический',
    highlights: JSON.stringify(['Синдзюку', 'Харадзюку', 'Храм Мэйдзи', 'Токио Скайтри']),
    image_url: '/uploads/japan-tokyo.jpg',
    available: true
  },
  {
    name: 'Киото - древняя столица',
    description: 'Традиционный тур по Киото с посещением храмов и садов',
    price: 95000,
    country: 'Япония',
    duration: '6 дней / 5 ночей',
    category: 'Традиционный',
    highlights: JSON.stringify(['Храм Фусими Инари', 'Золотой павильон', 'Сад камней']),
    image_url: '/uploads/japan-kyoto.jpg',
    available: true
  },

  // США
  {
    name: 'Нью-Йорк - город, который никогда не спит',
    description: 'Тур по Нью-Йорку с посещением главных достопримечательностей',
    price: 150000,
    country: 'США',
    duration: '8 дней / 7 ночей',
    category: 'Городской',
    highlights: JSON.stringify(['Статуя Свободы', 'Таймс-сквер', 'Центральный парк', 'Эмпайр-стейт-билдинг']),
    image_url: '/uploads/usa-newyork.jpg',
    available: true
  },
  {
    name: 'Лос-Анджелес - город ангелов',
    description: 'Тур по Лос-Анджелесу с посещением Голливуда',
    price: 130000,
    country: 'США',
    duration: '7 дней / 6 ночей',
    category: 'Развлекательный',
    highlights: JSON.stringify(['Голливуд', 'Беверли-Хиллз', 'Санта-Моника', 'Диснейленд']),
    image_url: '/uploads/usa-losangeles.jpg',
    available: true
  },

  // ОАЭ
  {
    name: 'Дубай - город будущего',
    description: 'Роскошный тур по Дубаю с посещением современных достопримечательностей',
    price: 110000,
    country: 'ОАЭ',
    duration: '7 дней / 6 ночей',
    category: 'Роскошный',
    highlights: JSON.stringify(['Бурдж-Халифа', 'Пальма Джумейра', 'Дубай Молл', 'Пустынное сафари']),
    image_url: '/uploads/uae-dubai.jpg',
    available: true
  },
  {
    name: 'Абу-Даби - столица ОАЭ',
    description: 'Тур по Абу-Даби с посещением мечети шейха Зайда',
    price: 98000,
    country: 'ОАЭ',
    duration: '6 дней / 5 ночей',
    category: 'Культурный',
    highlights: JSON.stringify(['Мечеть шейха Зайда', 'Лувр Абу-Даби', 'Яс Марина']),
    image_url: '/uploads/uae-abudhabi.jpg',
    available: true
  }
];

// Функция для вставки данных
function insertForeignTours() {
  console.log('Начинаем вставку зарубежных туров...');

  // Подготавливаем SQL запрос
  const insertQuery = `
    INSERT INTO foreign_tours (
      name, description, price, country, duration, category, 
      highlights, image_url, available
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Вставляем каждый тур
  foreignTours.forEach((tour, index) => {
    db.run(insertQuery, [
      tour.name,
      tour.description,
      tour.price,
      tour.country,
      tour.duration,
      tour.category,
      tour.highlights,
      tour.image_url,
      tour.available ? 1 : 0
    ], function(err) {
      if (err) {
        console.error(`Ошибка при вставке тура ${index + 1}:`, err.message);
      } else {
        console.log(`✅ Тур "${tour.name}" (${tour.country}) успешно добавлен`);
      }
    });
  });

  // Закрываем соединение после завершения
  setTimeout(() => {
    db.close((err) => {
      if (err) {
        console.error('Ошибка при закрытии базы данных:', err.message);
      } else {
        console.log('\n🎉 Все зарубежные туры успешно добавлены в базу данных!');
        console.log(`📊 Всего добавлено: ${foreignTours.length} туров`);
        console.log('🌍 Страны: Италия, Франция, Испания, Германия, Турция, Греция, Таиланд, Япония, США, ОАЭ');
      }
    });
  }, 2000);
}

// Проверяем существование таблицы и создаем её при необходимости
db.serialize(() => {
  // Создаем таблицу foreign_tours если она не существует
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS foreign_tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      country TEXT NOT NULL,
      duration TEXT,
      category TEXT,
      highlights TEXT,
      image_url TEXT,
      available BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Ошибка при создании таблицы foreign_tours:', err.message);
    } else {
      console.log('✅ Таблица foreign_tours готова');
      
      // Очищаем таблицу перед вставкой новых данных
      db.run('DELETE FROM foreign_tours', (err) => {
        if (err) {
          console.error('Ошибка при очистке таблицы:', err.message);
        } else {
          console.log('🧹 Таблица очищена, начинаем вставку данных...');
          insertForeignTours();
        }
      });
    }
  });
});



















