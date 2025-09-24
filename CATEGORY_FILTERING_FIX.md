# Исправление фильтрации по категориям в админской панели

## 🐛 Проблема

Фильтрация по категориям в админской панели не работала. При нажатии на категорию в левой панели отображались все карточки, а не только те, которые принадлежат выбранной категории.

## 🔍 Диагностика

Проблема заключалась в том, что:
1. Дочерние компоненты (редакторы) не получали информацию о выбранной категории из URL
2. Не было логики фильтрации данных по категориям в редакторах
3. Состояние выбранной категории не синхронизировалось с URL параметрами

## ✅ Решение

### 1. Обновление AdminLayout.tsx

#### Добавлена синхронизация с URL:
```typescript
const currentCategory = searchParams.get('category') || 'Все';
const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory);

// Синхронизируем состояние с URL при изменении параметров
useEffect(() => {
  setSelectedCategory(currentCategory);
}, [currentCategory]);
```

### 2. Обновление ToursEditor.tsx

#### Добавлено получение параметра категории из URL:
```typescript
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const selectedCategory = searchParams.get('category') || 'Все';

const [allTours, setAllTours] = useState<Tour[]>([]); // Все туры для фильтрации
```

#### Обновлена функция fetchTours:
```typescript
const fetchTours = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/tours');
    const allToursData = response.data;
    setAllTours(allToursData);
    
    // Фильтруем туры по выбранной категории
    let filteredTours = allToursData;
    if (selectedCategory !== 'Все') {
      filteredTours = allToursData.filter((tour: Tour) => tour.category === selectedCategory);
    }
    setTours(filteredTours);
    
    // Собираем уникальные категории из существующих туров
    const categories = Array.from(new Set(
      allToursData
        .map((tour: Tour) => tour.category)
        .filter(Boolean)
    )) as string[];
    setExistingCategories(categories);
  } catch (error) {
    console.error('Error fetching tours:', error);
    toast.error('Ошибка загрузки туров');
  }
};
```

#### Добавлен useEffect для обновления фильтрации:
```typescript
// Обновляем фильтрацию при изменении категории
useEffect(() => {
  if (allTours.length > 0) {
    let filteredTours = allTours;
    if (selectedCategory !== 'Все') {
      filteredTours = allTours.filter((tour: Tour) => tour.category === selectedCategory);
    }
    setTours(filteredTours);
  }
}, [selectedCategory, allTours]);
```

### 3. Обновление HotelsEditor.tsx

#### Аналогичные изменения:
- Добавлено получение параметра категории из URL
- Добавлено состояние `allHotels` для хранения всех отелей
- Обновлена функция `fetchHotels` с фильтрацией
- Добавлен useEffect для обновления фильтрации при изменении категории

### 4. Обновление ForeignEditor.tsx

#### Специальная логика для зарубежных туров:
```typescript
// Обновляем фильтрацию при изменении категории (страны)
useEffect(() => {
  if (allTours.length > 0) {
    let filteredTours = allTours;
    if (selectedCategory !== 'Все') {
      filteredTours = allTours.filter((tour: ForeignTour) => tour.country === selectedCategory);
    }
    setTours(filteredTours);
  }
}, [selectedCategory, allTours]);
```

**Примечание**: Для зарубежных туров фильтрация происходит по полю `country`, а не `category`.

## 🔧 Логика фильтрации

### Принцип работы:
1. **Загрузка данных**: Все данные загружаются и сохраняются в состоянии `allItems`
2. **Фильтрация**: При изменении категории данные фильтруются из `allItems`
3. **Отображение**: Отображаются только отфильтрованные данные

### Правила фильтрации:
- **Туры по Сочи**: фильтрация по полю `category`
- **Зарубежные туры**: фильтрация по полю `country`
- **Отели**: фильтрация по полю `category`
- **Круизы**: фильтрация по полю `category`
- **Акции**: фильтрация по полю `category`
- **Услуги**: фильтрация по полю `category`

## 📊 Результаты

### Функциональность:
- ✅ Фильтрация работает корректно для всех разделов
- ✅ При выборе категории отображаются только соответствующие карточки
- ✅ При выборе "Все" отображаются все карточки
- ✅ Синхронизация с URL параметрами

### Производительность:
- ✅ Данные загружаются один раз при инициализации
- ✅ Фильтрация происходит на клиенте без дополнительных запросов
- ✅ Быстрое переключение между категориями

### Пользовательский опыт:
- ✅ Интуитивная работа фильтрации
- ✅ Сохранение выбранной категории при навигации
- ✅ Корректное отображение количества карточек

## 🚀 Использование

1. **Выбор категории**: Нажмите на категорию в левой панели
2. **Фильтрация**: Карточки автоматически отфильтруются
3. **Сброс фильтра**: Нажмите "Все" для отображения всех карточек
4. **Навигация**: Выбранная категория сохраняется при переходах между разделами

## 🎉 Заключение

Фильтрация по категориям в админской панели теперь работает корректно. Все редакторы правильно получают параметр категории из URL и фильтруют данные соответственно. Система стала более удобной и функциональной для управления контентом.



















