// Получаем элементы
const sportCalendarButton = document.getElementById('sportCalendar');
const sportTrainingButton = document.getElementById('sportTraining');
const sportStatisticsButton = document.getElementById('sportStatistics');
const sportCalendarInfo = document.getElementById('sportCalendarInfo');
const sportTrainingInfo = document.getElementById('sportTrainingInfo');
const sportStatisticsInfo = document.getElementById('sportStatisticsInfo');
// Получаем элементы для подразделов тренировок
const sportTrainingInfoProgramsButton = document.getElementById('sportTrainingInfoPrograms');
const sportTrainingInfoExercisesButton = document.getElementById('sportTrainingInfoExercises');
const sportTrainingInfoClassesButton = document.getElementById('sportTrainingInfoClasses');
const sportTrainingInfoProgramsInfo = document.getElementById('sportTrainingInfoProgramsInfo');
const sportTrainingInfoExercisesInfo = document.getElementById('sportTrainingInfoExercisesInfo');
const sportTrainingInfoClassesInfo = document.getElementById('sportTrainingInfoClassesInfo');
// Функция для отображения выбранной секции
function showSection(section) {
    sportCalendarInfo.style.display = 'none';
    sportTrainingInfo.style.display = 'none';
    sportStatisticsInfo.style.display = 'none';
    section.style.display = 'block'; // Показываем выбранную секцию
}
// Функция для отображения выбранного подраздела тренировок
function showTrainingSubsection(subsection) {
    sportTrainingInfoProgramsInfo.style.display = 'none';
    sportTrainingInfoExercisesInfo.style.display = 'none';
    sportTrainingInfoClassesInfo.style.display = 'none';
    subsection.style.display = 'block'; // Показываем выбранный подраздел
}
// Обработчики событий для кнопок
sportCalendarButton.onclick = function() {
    showSection(sportCalendarInfo);
};
sportTrainingButton.onclick = function() {
    showSection(sportTrainingInfo);
    showTrainingSubsection(sportTrainingInfoProgramsInfo); // Изначально показываем программы
};
sportStatisticsButton.onclick = function() {
    showSection(sportStatisticsInfo);
};
// Обработчики событий для подразделов тренировок
sportTrainingInfoProgramsButton.onclick = function() {
    showTrainingSubsection(sportTrainingInfoProgramsInfo);
};
sportTrainingInfoExercisesButton.onclick = function() {
    showTrainingSubsection(sportTrainingInfoExercisesInfo);
};
sportTrainingInfoClassesButton.onclick = function() {
    showTrainingSubsection(sportTrainingInfoClassesInfo);
};
// Инициализация, чтобы показать сначала календарь
showSection(sportCalendarInfo);
// Изначально показываем программы в тренировках
showTrainingSubsection(sportTrainingInfoProgramsInfo);













// Классы 
// Классы 
// Классы
// Классы
// Получаем элементы модального окна и списка классов
const sportTrainingInfoClassesButtonAdd = document.getElementById('sportTrainingInfoClassesButtonAdd');
const sportTrainingInfoClassesList = document.getElementById('sportTrainingInfoClassesList');
const modalAddClass = document.getElementById('sportTrainingInfoClassesModalAdd');
const modalCloseAddClass = document.querySelector('.modalCloseAddClass');
const primaryAddButton = document.getElementById('sportTrainingInfoClassesPrimaryAdd');
const secondaryAddButton = document.getElementById('sportTrainingInfoClassesSecondaryAdd');
const primaryAddModal = document.getElementById('sportTrainingInfoClassesPrimaryAddModal');
const secondaryAddModal = document.getElementById('sportTrainingInfoClassesSecondaryAddModal');
const primaryClassNameInput = document.getElementById('sportTrainingInfoClassesPrimaryAddModalTitle');
const savePrimaryButton = document.getElementById('sportTrainingInfoClassesPrimaryAddModalButtonSave');
const secondaryClassNameInput = document.getElementById('sportTrainingInfoClassesSecondaryAddTitle');
const primaryClassSelector = document.getElementById('sportTrainingInfoClassesPrimaryAddModalSelector');
const saveSecondaryButton = document.getElementById('sportTrainingInfoClassesSecondaryAddModalButtonSave');

let arrayOfClasses = JSON.parse(localStorage.getItem('arrayOfClasses')) || [];

// Функция для обновления списка классов и сохранения в localStorage
function updateClassesList() {
    sportTrainingInfoClassesList.innerHTML = ''; // Очищаем текущий список классов

    const primaryClasses = arrayOfClasses.filter(c => c.type === 'primary');
    const secondaryClasses = arrayOfClasses.filter(c => c.type === 'secondary');

    primaryClasses.forEach(primaryClass => {
        const primaryDiv = document.createElement('div');
        primaryDiv.className = "sportTrainingInfoClassesContentWrap";

        // Упаковываем названия классов в span
        const primaryClassNameSpan = document.createElement('div');
        primaryClassNameSpan.className = "sportTrainingInfoClassesContentH2";
        primaryClassNameSpan.textContent = primaryClass.name;
        // primaryClassNameSpan.textContent = primaryClass.name + ' (Первичный)';
        primaryDiv.appendChild(primaryClassNameSpan);

        // Проверяем и добавляем вторичные классы
        const associatedSecondaryClasses = secondaryClasses.filter(s => s.primaryClass === primaryClass.name);
        if (associatedSecondaryClasses.length > 0) {
            associatedSecondaryClasses.forEach(secondaryClass => {
                const secondarySpan = document.createElement('div');
                secondarySpan.className = "sportTrainingInfoClassesContentWrapSecondaryClass";
                
                const secondarySpanSpan = document.createElement('div');
                secondarySpanSpan.className = "sportTrainingInfoClassesContentWrapSecondaryClassContent";
                secondarySpanSpan.textContent = ' ' + secondaryClass.name;
                // secondarySpanSpan.textContent = ' ' + secondaryClass.name + ' (Вторичный)';
                secondarySpan.appendChild(secondarySpanSpan);
                
                const secondarySpanSpanWrap = document.createElement('div');
                secondarySpanSpanWrap.className = "sportTrainingInfoClassesContentWrapSecondaryClassContentWrapButton";

                // Добавляем кнопку удаления для вторичного класса
                const deleteSecondaryButton = document.createElement('button');
                deleteSecondaryButton.textContent = 'Удалить';
                deleteSecondaryButton.onclick = function() {
                    if (confirm('Вы уверены, что хотите удалить этот вторичный класс?')) {
                        arrayOfClasses = arrayOfClasses.filter(c => c !== secondaryClass);
                        updateClassesList();
                    }
                };
                secondarySpanSpanWrap.appendChild(deleteSecondaryButton); // Добавляем кнопку удаления ко вторичному классу
                secondarySpan.appendChild(secondarySpanSpanWrap); // Добавляем кнопку удаления ко вторичному классу
                primaryDiv.appendChild(secondarySpan); // Добавляем вторичный класс к первичному
            });
        }

        // Добавляем кнопку удаления для первичного класса, если нет вторичных
        if (associatedSecondaryClasses.length === 0) {
            const deletePrimaryButton = document.createElement('button');
            deletePrimaryButton.textContent = 'Удалить';
            deletePrimaryButton.onclick = function() {
                if (confirm('Вы уверены, что хотите удалить этот первичный класс?')) {
                    arrayOfClasses = arrayOfClasses.filter(c => c !== primaryClass);
                    updateClassesList();
                }
            };
            primaryDiv.appendChild(deletePrimaryButton); // Добавляем кнопку удаления к первичному классу
        }

        sportTrainingInfoClassesList.appendChild(primaryDiv); // Добавляем первичный класс в общий список
    });

    localStorage.setItem('arrayOfClasses', JSON.stringify(arrayOfClasses)); // Сохраняем в localStorage
}

// Отображение модального окна
sportTrainingInfoClassesButtonAdd.onclick = function() {
    modalAddClass.style.display = 'block';
    toggleBodyScroll(true);
};

// Закрытие модального окна
modalCloseAddClass.onclick = function() {
    modalAddClass.style.display = 'none';
    primaryAddModal.style.display = 'none';
    secondaryAddModal.style.display = 'none';
    toggleBodyScroll(false);
};

function toggleBodyScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }

// Логика для добавления первичного класса
primaryAddButton.onclick = function() {
    primaryAddModal.style.display = 'block';
    secondaryAddModal.style.display = 'none';
};

savePrimaryButton.onclick = function() {
    const className = primaryClassNameInput.value.trim();
    
    if (className) {
        // Проверяем, существует ли уже класс с таким именем
        const classExists = arrayOfClasses.some(c => c.type === 'primary' && c.name === className);

        if (classExists) {
            alert("Класс с таким названием уже существует. Пожалуйста, выберите другое название.");
        } else {
            const newClass = { name: className, type: 'primary' };
            arrayOfClasses.push(newClass);
            primaryClassNameInput.value = ''; // Очищаем поле ввода
            updateClassesList();
            modalAddClass.style.display = 'none'; // Закрываем модальное окно
            toggleBodyScroll(false);
        }
    } else {
        alert("Пожалуйста, введите название первичного класса.");
    }
};

// Логика для добавления вторичного класса
secondaryAddButton.onclick = function() {
    primaryAddModal.style.display = 'none';
    secondaryAddModal.style.display = 'block';

    // Сброс селектора первичных классов
    primaryClassSelector.innerHTML = '';
    arrayOfClasses.forEach((classItem) => {
        if (classItem.type === 'primary') {
            const option = document.createElement('option');
            option.value = classItem.name;
            option.textContent = classItem.name;
            primaryClassSelector.appendChild(option); // Добавить опции для выбора
        }
    });
};

saveSecondaryButton.onclick = function() {
    const className = secondaryClassNameInput.value.trim();
    const primaryClassName = primaryClassSelector.value;

    if (className && primaryClassName) {
        const newClass = { name: className, type: 'secondary', primaryClass: primaryClassName };
        arrayOfClasses.push(newClass);
        secondaryClassNameInput.value = ''; // Очищаем поле ввода
        updateClassesList();
        modalAddClass.style.display = 'none'; // Закрываем модальное окно
        toggleBodyScroll(false);
    } else {
        alert("Пожалуйста, выберите первичный класс и введите название вторичного класса.");
    }
};

// Инициализация списка классов при загрузке
updateClassesList();
// Классы 
// Классы 
// Классы
// Классы













// Упражнения
// Упражнения
// Упражнения color
// Упражнения
// Логика для добавления упражнений

const sportTrainingInfoExercisesButtonAdd = document.getElementById('sportTrainingInfoExercisesButtonAdd');
const sportTrainingInfoExercisesList = document.getElementById('sportTrainingInfoExercisesList');
const modalAdd = document.getElementById('sportTrainingInfoExercisesModalAdd');
const modalClose = document.querySelector('.modalCloseAddExercises');
const saveButton = document.getElementById('sportTrainingInfoExercisesModalButtonSave');
const primaryClassSelect = document.getElementById('sportTrainingInfoExercisesModalClassPrimary');
const secondaryClassSelect = document.getElementById('sportTrainingInfoExercisesModalClassSecondary');


// Загрузка упражнений из localStorage, если они существуют
let arrayOfExercises = JSON.parse(localStorage.getItem('arrayOfExercises')) || [];
let currentExerciseIndex = null;

// Функция для заполнения списка первичных классов
function populatePrimaryClassSelect() {
    primaryClassSelect.innerHTML = ''; // Очищаем текущие опции

    // Заполняем выпадающий список только первичными классами
    arrayOfClasses.forEach((classItem) => {
        if (classItem.type === "primary") {
            const option = document.createElement('option');
            option.value = classItem.name;
            option.textContent = classItem.name;
            primaryClassSelect.appendChild(option);
        }
    });
}

// Функция для заполнения списка вторичных классов
function populateSecondaryClassSelect(selectedPrimary) {
    secondaryClassSelect.innerHTML = ''; // Очищаем предыдущие опции

    // Заполняем вторичный класс, если выбран первичный
    arrayOfClasses.forEach((classItem) => {
        if (classItem.type === "secondary" && classItem.primaryClass === selectedPrimary) {
            const option = document.createElement('option');
            option.value = classItem.name;
            option.textContent = classItem.name;
            secondaryClassSelect.appendChild(option);
        }
    });
}

// Заполнение первичных классов при загрузке
populatePrimaryClassSelect();

// Обработка изменения первичного класса для заполнения вторичного
primaryClassSelect.onchange = function() {
    const selectedPrimary = primaryClassSelect.value;
    populateSecondaryClassSelect(selectedPrimary);
};

// Открытие модального окна для добавления упражнения
sportTrainingInfoExercisesButtonAdd.onclick = function() {
    modalAdd.style.display = 'block'; // Показываем модальное окно
    primaryClassSelect.selectedIndex = 0; // Сброс до первого значения
    secondaryClassSelect.innerHTML = ''; // Очищаем вторичный класс
    populateSecondaryClassSelect(primaryClassSelect.value); // Заполнение вторичных классов по умолчанию
    clearInputFields(); // Очистка полей ввода
    currentExerciseIndex = null; // Сбрасываем текущий индекс упражнения
    toggleBodyScroll(true);
};

// Закрытие модального окна
modalClose.onclick = function() {
    modalAdd.style.display = 'none'; // Скрываем модальное окно
    toggleBodyScroll(false);
};

function toggleBodyScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }

// Функция для проверки уникальности
function isTitleUnique(title) {
    return arrayOfExercises.every(exercise => exercise.title.toLowerCase() !== title.toLowerCase());
}

// Функция для генерации уникального ID длиной 10 символов
function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

// Сохранение нового упражнения
saveButton.onclick = function() {
    const title = document.getElementById('sportTrainingInfoExercisesModalTitle').value;
    const description = document.getElementById('sportTrainingInfoExercisesModalDescription').value;
    const primaryClass = primaryClassSelect.value;
    const secondaryClass = secondaryClassSelect.value;
    const color = document.getElementById('sportTrainingInfoExercisesModalColor').value; // Цвет в HEX
    const opacity = document.getElementById('sportTrainingInfoExercisesModalOpacity').value;

    if (title) {
        if (!isTitleUnique(title) && currentExerciseIndex === null) {
            alert("Упражнение с таким названием уже существует! Пожалуйста, выберите уникальное название."); // Уведомление о дубликате
            return;
        }

        const rgbaColor = hexToRgba(color, opacity); // Преобразование цвета HEX в RGBA
        let exercise;

        if (currentExerciseIndex !== null) {
            // Если редактируем упражнение, берем существующий ID
            const existingExercise = arrayOfExercises[currentExerciseIndex];
            if (existingExercise.title.toLowerCase() !== title.toLowerCase() && !isTitleUnique(title)) {
                alert("Упражнение с таким названием уже существует! Пожалуйста, выберите уникальное название."); // Уведомление о дубликате
                return;
            }

            // Создаем объект упражнения, копируя существующий ID
            exercise = {
                id: existingExercise.id, // Сохраняем существующий ID
                title,
                description,
                primaryClass,
                secondaryClass,
                color: rgbaColor // Сохраняем цвет в формате RGBA
            };

            // Обновляем массив упражнений
            arrayOfExercises[currentExerciseIndex] = exercise;
        } else {
            // Если добавляем новое упражнение, генерируем новый ID
            exercise = {
                id: generateUniqueId(), // Присваиваем уникальный ID
                title,
                description,
                primaryClass,
                secondaryClass,
                color: rgbaColor // Сохраняем цвет в формате RGBA
            };
            arrayOfExercises.push(exercise);
        }

        localStorage.setItem('arrayOfExercises', JSON.stringify(arrayOfExercises)); // Сохранение в localStorage
        updateExerciseList(); // Обновление списка

        // Скрытие модального окна после сохранения
        modalAdd.style.display = 'none';

        // Очистка полей ввода
        clearInputFields();
    } else {
        alert("Пожалуйста, введите название упражнения."); // Уведомление, если имя не введено
    }
};

// Функция для обновления списка упражнений в интерфейсе
function updateExerciseList() {
    sportTrainingInfoExercisesList.innerHTML = ''; // Очищаем текущий список
        const exerciseItemWrap = document.createElement('div');
        exerciseItemWrap.className = "sportTrainingInfoExerciseListWrap";
    arrayOfExercises.forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.className = "sportTrainingInfoExerciseContentWrap";
            exerciseItem.style.backgroundColor = exercise.color; // Устанавливаем цвет фона
            exerciseItem.style.opacity = 1; // Устанавливаем непрозрачность
            exerciseItem.style.padding = "10px";
            exerciseItem.style.margin = "10px 0";
            exerciseItem.style.borderRadius = "5px";
            // exerciseItem.style.color = "#000";
            exerciseItem.innerHTML = `
            <div class="sportTrainingInfoExerciseContentTitle">${exercise.title}</div>
            <div class="sportTrainingInfoExerciseContentWrapContent">
            <div class="sportTrainingInfoExerciseContentClass">${exercise.primaryClass}, ${exercise.secondaryClass}</div>
            <div class="sportTrainingInfoExerciseContentDescription"> ${exercise.description}</div>
            </div>
            <div class="sportTrainingInfoExerciseContentButtonWrap">
            <button onclick="editExercise(${index})">Редактировать</button>
            <button onclick="deleteExercise(${index})">Удалить</button>
            </div>
        `;
        // ID: ${exercise.id},
        // Цвет: ${exercise.color}
        sportTrainingInfoExercisesList.appendChild(exerciseItemWrap);
        exerciseItemWrap.appendChild(exerciseItem);
    });
}

// Функция для преобразования цвета HEX в RGBA
function hexToRgba(hex, opacity) {
    hex = hex.replace('#', '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Очистка полей ввода
function clearInputFields() {
    document.getElementById('sportTrainingInfoExercisesModalTitle').value = '';
    document.getElementById('sportTrainingInfoExercisesModalDescription').value = '';
    primaryClassSelect.selectedIndex = 0; // Сброс до первого значения
    secondaryClassSelect.innerHTML = ''; // Очищаем вторичный класс
    document.getElementById('sportTrainingInfoExercisesModalColor').value = '#1B72E4'; // Возвращаем к красному по умолчанию
    document.getElementById('sportTrainingInfoExercisesModalOpacity').value = 0.5; // Устанавливаем непрозрачность по умолчанию
}

// Функция для редактирования упражнения
function editExercise(index) {
    currentExerciseIndex = index; // Сохраняем индекс редактируемого упражнения
    const exercise = arrayOfExercises[index]; // Получаем упражнение

    // Заполняем поля данными упражнения
    document.getElementById('sportTrainingInfoExercisesModalTitle').value = exercise.title;
    document.getElementById('sportTrainingInfoExercisesModalDescription').value = exercise.description;
    primaryClassSelect.value = exercise.primaryClass; // Устанавливаем первичный класс
    populateSecondaryClassSelect(exercise.primaryClass); // Заполняем вторичный класс
    secondaryClassSelect.value = exercise.secondaryClass; // Устанавливаем вторичный класс
    document.getElementById('sportTrainingInfoExercisesModalColor').value = rgbaToHex(exercise.color); // Устанавливаем цвет
    // document.getElementById('sportTrainingInfoExercisesModalOpacity').value = exercise.color.split(',')[3].slice(0, -1); // Устанавливаем непрозрачность
    document.getElementById('sportTrainingInfoExercisesModalOpacity').value = parseFloat(exercise.color.slice(-3, -1)); // Извлечение значения opacity

    modalAdd.style.display = 'block'; // Показываем модальное окно
}

// Функция для преобразования цвета из rgba в hex
function rgbaToHex(rgba) {
    const rgbaArray = rgba.match(/\d+/g); // Извлекаем числа из rgba
    const r = parseInt(rgbaArray[0]);
    const g = parseInt(rgbaArray[1]);
    const b = parseInt(rgbaArray[2]);
    return "#" + ("0" + r.toString(16).toUpperCase()).slice(-2) + 
                 ("0" + g.toString(16).toUpperCase()).slice(-2) + 
                 ("0" + b.toString(16).toUpperCase()).slice(-2);
}

// Функция для удаления упражнения
function deleteExercise(index) {
    if (confirm("Вы уверены, что хотите удалить это упражнение?")) {
        arrayOfExercises.splice(index, 1); // Удаляем упражнение
        localStorage.setItem('arrayOfExercises', JSON.stringify(arrayOfExercises)); // Сохраняем изменения в localStorage
        updateExerciseList(); // Обновление списка
    }
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    populateSecondaryClassSelect(primaryClassSelect.value); // Заполняем вторичный класс (будет пустым до выбора)
    updateExerciseList(); // Обновить список во время загрузки страницы
});

// Логика для добавления упражнений
// Логика для добавления упражнений
// Упражнения
// Упражнения
// Упражнения
// Упражнения













// Программы 
// Программы
// Программы
// Программы
// Логика для добавления программ

let arrayOfPrograms = JSON.parse(localStorage.getItem('arrayOfPrograms')) || [];

const sportTrainingInfoProgramsButtonAdd = document.getElementById('sportTrainingInfoProgramsButtonAdd');
const sportTrainingInfoProgramsModalAdd = document.getElementById('sportTrainingInfoProgramsModalAdd');
const sportTrainingInfoProgramsModalAvailableExercisesListAdd = document.getElementById('sportTrainingInfoProgramsModalAvailableExercisesListAdd');
const sportTrainingInfoProgramsModalAvailableExercisesAdd = document.getElementById('sportTrainingInfoProgramsModalAvailableExercisesAdd');
const sportTrainingInfoProgramsModalButtonSave = document.getElementById('sportTrainingInfoProgramsModalButtonSave');
const sportTrainingInfoProgramsList = document.getElementById('sportTrainingInfoProgramsList');
const modalCloseAddPrograms = document.querySelector('.modalCloseAddPrograms');

let selectedExercises = [];
let editingProgram = null; // Хранит программ, которую мы редактируем

// Функция для открытия модального окна
sportTrainingInfoProgramsButtonAdd.onclick = function() {
    clearModalFields(); // Очищаем поля модального окна перед добавлением
    sportTrainingInfoProgramsModalAdd.style.display = 'block';
    toggleBodyScroll(true);
    renderAvailableExercises();
    selectedExercises = [];
    renderSelectedExercises();
};

// Закрытие модального окна
modalCloseAddPrograms.onclick = function() {
    sportTrainingInfoProgramsModalAdd.style.display = 'none';
    toggleBodyScroll(false);
};

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target === sportTrainingInfoProgramsModalAdd) {
        sportTrainingInfoProgramsModalAdd.style.display = 'none';
        toggleBodyScroll(false);
    }
};

function toggleBodyScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }


// Функция для отображения доступных упражнений
function renderAvailableExercises() {
    sportTrainingInfoProgramsModalAvailableExercisesListAdd.innerHTML = '';

    arrayOfExercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.style.backgroundColor = exercise.color;
        exerciseElement.style.padding = "10px";
        exerciseElement.style.margin = "10px 0";
        exerciseElement.style.borderRadius = "5px";
        exerciseElement.style.color = "#000";
        exerciseElement.innerHTML = `
            ${exercise.primaryClass}
            (${exercise.secondaryClass})<p>
            ${exercise.title}<p>
            ${exercise.description}.<p>
        `;

        const addButton = document.createElement('button');
        addButton.textContent = 'Добавить';
        addButton.onclick = function() {
            addExerciseToProgram(exercise); // Используем ссылку на оригинальные данные
        };

        exerciseElement.appendChild(addButton);
        sportTrainingInfoProgramsModalAvailableExercisesListAdd.appendChild(exerciseElement);
    });
}

// Функция добавления упражнения в программу
function addExerciseToProgram(exercise) {
    // Проверяем, что упражнение еще не добавлено по ссылке на объект
    if (!selectedExercises.includes(exercise)) {
        // Добавляем ссылку на оригинал
        selectedExercises.push(exercise);
        renderSelectedExercises(); // Обновляем отображение выбранных упражнений
    }
}
// Функция для отображения добавленных в программу упражнений
function renderSelectedExercises() {
    sportTrainingInfoProgramsModalAvailableExercisesAdd.innerHTML = '';

    selectedExercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.style.backgroundColor = exercise.color;
        exerciseElement.style.padding = "10px";
        exerciseElement.style.margin = "10px 0";
        exerciseElement.style.borderRadius = "5px";
        exerciseElement.style.color = "#000";
        
        exerciseElement.innerHTML = `
            ${exercise.primaryClass}
            (${exercise.secondaryClass})<p>
            ${exercise.title}<p>
            ${exercise.description}.<p>
        `;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.onclick = function() {
            // Удаляем упражнение по ссылке на объект
            selectedExercises = selectedExercises.filter(e => e !== exercise);
            renderSelectedExercises(); // Обновляем отображение после удаления
        };

        exerciseElement.appendChild(removeButton);
        sportTrainingInfoProgramsModalAvailableExercisesAdd.appendChild(exerciseElement);
    });
}

// Функция для генерации уникального ID длиной 10 символов
function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

// Функция для сохранения или редактирования программы
sportTrainingInfoProgramsModalButtonSave.onclick = function() {
    const programTitle = document.getElementById('sportTrainingInfoProgramsModalTitle').value;
    const programColor = document.getElementById('sportTrainingInfoProgramsModalColor').value;
    const programOpacity = parseFloat(document.getElementById('sportTrainingInfoProgramsModalOpacity').value);

    // Проверка на пустое название программы
    if (!programTitle) {
        alert("Введите название программы.");
        return;
    }

    // Проверка на уникальность названия программы (исключая редактируемую)
    if (arrayOfPrograms.some(program => program.title === programTitle && program !== editingProgram)) {
        alert("Программа с таким названием уже существует. Пожалуйста, выберите другое название.");
        return;
    }

    // Получаем RGBA цвет
    const rgbaColor = getRgbaColor(programColor, programOpacity);

    let program;

    if (editingProgram) {
        // Если редактируем программу, берем существующий ID
        const index = arrayOfPrograms.indexOf(editingProgram);
        program = {
            id: editingProgram.id, // Сохраняем существующий ID
            title: programTitle,
            color: rgbaColor,
            exercises: selectedExercises.map(exercise => ({
                id: exercise.id,
                title: exercise.title,
                description: exercise.description,
                primaryClass: exercise.primaryClass,
                secondaryClass: exercise.secondaryClass,
                color: exercise.color // Сохраняем необходимую информацию
            }))
        };
        
        // Обновление существующей программы
        arrayOfPrograms[index] = program; // Заменяем старую программу на новую

        // Перерисовываем список программ
        sportTrainingInfoProgramsList.innerHTML = ''; // Очищаем старый список
        loadPrograms(); // Загружаем обновленный список программ
    } else {
        // Если добавляем новую программу, генерируем новый ID
        program = {
            id: generateUniqueId(), // Присваиваем уникальный ID
            title: programTitle,
            color: rgbaColor,
            exercises: selectedExercises.map(exercise => ({
                id: exercise.id,
                title: exercise.title,
                description: exercise.description,
                primaryClass: exercise.primaryClass,
                secondaryClass: exercise.secondaryClass,
                color: exercise.color // Сохраняем необходимую информацию
            }))
        };

        // Добавление новой программы
        arrayOfPrograms.push(program);
        addProgramToList(program); // Добавляем новую программу в список
    }

    // Сохраняем данные в localStorage
    localStorage.setItem('arrayOfPrograms', JSON.stringify(arrayOfPrograms));

    // Очищаем поля
    clearModalFields(); 
    sportTrainingInfoProgramsModalAdd.style.display = 'none';
    toggleBodyScroll(false);

    // Сбрасываем редактирование для следующей итерации

    editingProgram = null; 
};
function toggleBodyScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }
  

// Функция для получения цвета в формате rgba
function getRgbaColor(hex, opacity) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Функция для добавления программы в список отображаемых программ
function addProgramToList(program) {
    const programItem = document.createElement('div');
    
    // programItem.textContent = `ID: ${program.id}, ${program.title}, Цвет: ${program.color}`;
    programItem.textContent = `${program.title}`;
    programItem.style.backgroundColor = program.color;
    programItem.style.padding = "10px";
    programItem.style.margin = "10px 0";
    programItem.style.borderRadius = "5px";
    // programItem.style.color = "#000";

    const exercisesList = document.createElement('div');
    exercisesList.style.marginTop = "10px";
    updateExercisesDisplay(program, exercisesList); // Функция для отображения упражнений
    programItem.appendChild(exercisesList);

    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
    editButton.onclick = function() {
        editProgram(program); // Функция редактирования программы
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = function() {
        if (confirm("Вы уверены, что хотите удалить эту программу?")) {
            const index = arrayOfPrograms.indexOf(program);
            if (index > -1) {
                arrayOfPrograms.splice(index, 1);
                localStorage.setItem('arrayOfPrograms', JSON.stringify(arrayOfPrograms));
                sportTrainingInfoProgramsList.removeChild(programItem);
            }
        }
    };

    programItem.appendChild(editButton);
    programItem.appendChild(deleteButton);
    sportTrainingInfoProgramsList.appendChild(programItem);

    // Запускаем периодическую проверку каждые 5 секунд
    setInterval(() => {
        checkAndUpdateExercises(program, exercisesList);
    }, 100);
}
// Функция для отображения упражнений
function updateExercisesDisplay(program, exercisesList) {
    exercisesList.innerHTML = ''; // Очищаем старый список
    program.exercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.style.backgroundColor = exercise.color;
        exerciseElement.style.padding = "10px";
        exerciseElement.style.margin = "10px 0";
        exerciseElement.style.borderRadius = "5px";
        // exerciseElement.style.color = "#000";
        
        exerciseElement.innerHTML = `
            ${exercise.primaryClass}
            (${exercise.secondaryClass})<p>
            ${exercise.title}<p>
            ${exercise.description}.<p>
        `;
        exercisesList.appendChild(exerciseElement);
    });
}
// Функция для проверки и обновления упражнений
function checkAndUpdateExercises(program, exercisesList) {
    const updatedExercises = []; // Новый массив для хранения обновленных упражнений

    program.exercises.forEach(exercise => {
        // Ищем Exercise в arrayOfExercises по id
        const updatedExercise = arrayOfExercises.find(e => e.id === exercise.id);
        if (updatedExercise) {
            // Если упражнение найдено, добавляем его в массив обновленных упражнений
            updatedExercises.push(updatedExercise);
        }
    });

    // Обновляем массив упражнений в программе
    program.exercises = updatedExercises;

    // Обновляем отображение упражнений в интерфейсе
    updateExercisesDisplay(program, exercisesList);
}
// Функция для преобразования цвета из rgba в hex
function rgbaToHex(rgba) {
    const rgbaArray = rgba.match(/\d+/g); // Извлекаем числа из rgba
    const r = parseInt(rgbaArray[0]);
    const g = parseInt(rgbaArray[1]);
    const b = parseInt(rgbaArray[2]);
    return "#" + ("0" + r.toString(16).toUpperCase()).slice(-2) + 
                 ("0" + g.toString(16).toUpperCase()).slice(-2) + 
                 ("0" + b.toString(16).toUpperCase()).slice(-2);
}
// Функция для редактирования программы
function editProgram(program) {
    editingProgram = program; // Установка редактируемой программы
    document.getElementById('sportTrainingInfoProgramsModalTitle').value = program.title;

    // Преобразуем цвет из rgba в hex перед установкой
    const hexColor = rgbaToHex(program.color);
    document.getElementById('sportTrainingInfoProgramsModalColor').value = hexColor; 
    document.getElementById('sportTrainingInfoProgramsModalOpacity').value = parseFloat(program.color.slice(-3, -1)); // Извлечение значения opacity

    selectedExercises = program.exercises.slice(); // Копируем упражнения текущей программы
    renderSelectedExercises();

    // Вызов функции отображения доступных упражнений
    renderAvailableExercises();

    sportTrainingInfoProgramsModalAdd.style.display = 'block'; // Показываем модальное окно
    toggleBodyScroll(true);
}
function toggleBodyScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }
// Функция для очистки полей модального окна
function clearModalFields() {
    document.getElementById('sportTrainingInfoProgramsModalTitle').value = '';
    document.getElementById('sportTrainingInfoProgramsModalColor').value = '#1B72E4';
    document.getElementById('sportTrainingInfoProgramsModalOpacity').value = 0.5;
    selectedExercises = []; // Сброс упражнений
    sportTrainingInfoProgramsModalAvailableExercisesAdd.innerHTML = ''; // Очищаем добавленные упражнения
}
// Инициализируем список программ при загрузке страницы
function loadPrograms() {
    // Проверяем, что массив программ существует и не пустой
    if (Array.isArray(arrayOfPrograms) && arrayOfPrograms.length > 0) {
        arrayOfPrograms.forEach(program => {
            addProgramToList(program); // Добавляем каждую программу в список
        });
    } else {
        console.log("Нет доступных программ для загрузки."); // Сообщение в случае отсутствия программ
    }
}

// Загружаем программы из localStorage при инициализации
loadPrograms();

// Программы
// Программы
// Программы
// Программы













// Календарь
// Календарь
// Календарь
// Календарь

const datesContainer = document.getElementById("datesContainer");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const selectMonthBtn = document.getElementById("selectMonthBtn");
const selectYearBtn = document.getElementById("selectYearBtn");

const monthModal = document.getElementById("monthModal");
const closeMonthModal = document.getElementById("closeMonthModal");
const yearModal = document.getElementById("yearModal");
const closeYearModal = document.getElementById("closeYearModal");

let currentDate = new Date(); // Текущая дата (нужно для определения текущего года и месяца)


let sharedArrayWithDates = {}; 
let selectedDateKey = JSON.parse(localStorage.getItem('selectedDateKey')) || [];
let selectedDate = JSON.parse(localStorage.getItem('selectedDate')) || [];

// Функция для сохранения в localStorage
function saveToLocalStorage() {
    localStorage.setItem("sharedArrayWithDates", JSON.stringify(sharedArrayWithDates));
    localStorage.setItem('selectedDate', JSON.stringify(selectedDate)); 
    localStorage.setItem('selectedDateKey', JSON.stringify(selectedDateKey)); 
}

// Основная функция обработки клика по дате
function handleDateClick(day, month, year) {
    console.log("Clicked date:", day, month, year); // Для отладки

    // Сформируем ключи
    const yearKey = "arrayYear" + year;
    const monthKey = "arrayMonth" + month;
    const dayKey = "arrayDay" + day;

    // Очистка массивов перед записью новых значений
    selectedDate.length = 0; // Очищаем массив selectedDate
    selectedDateKey.length = 0; // Очищаем массив selectedDateKey

    // Добавим новые данные в массивы
    selectedDate.push(day, month, year); // Записываем новую дату
    selectedDateKey.push(yearKey, monthKey, dayKey); // Записываем новые ключи

    // Логируем данные для проверки
    console.log("Selected Date:", selectedDate);
    console.log("Selected Date Keys:", selectedDateKey);

    // Проверяем и инициализируем sharedArrayWithDates
    if (!sharedArrayWithDates[yearKey]) {
        sharedArrayWithDates[yearKey] = {};
    }
    if (!sharedArrayWithDates[yearKey][monthKey]) {
        sharedArrayWithDates[yearKey][monthKey] = {};
    }
    if (!sharedArrayWithDates[yearKey][monthKey][dayKey]) {
        sharedArrayWithDates[yearKey][monthKey][dayKey] = [];
    }

    // Сохранение в localStorage
    saveToLocalStorage();
}

function renderCalendar() {
    datesContainer.innerHTML = "";
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const currentDay = new Date();

    monthYear.innerText = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    // Определяем текущий месяц и год
    const today = new Date();
    const month = today.getMonth(); 
    const year = today.getFullYear(); 

    // Устанавливаем индекс первого дня месяца (0 - воскресенье, 1 - понедельник и т.д.)
    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Преобразуем к понедельнику

    // Получаем количество дней в предыдущем месяце
    const lastDateOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    
    // Заполняем дни предыдущего месяца
    for (let i = firstDayIndex; i > 0; i--) {
        const prevDateDiv = document.createElement("div");
        prevDateDiv.className = "date previous-month";
        prevDateDiv.innerText = lastDateOfPrevMonth.getDate() - i + 1;
        datesContainer.appendChild(prevDateDiv);
    }

    // Заполняем дни текущего месяца
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const dateDiv = document.createElement("div");
        dateDiv.className = "date";
        dateDiv.innerText = i;

        // Подсвечиваем текущую дату
        if (i === currentDay.getDate() && currentDate.getMonth() === currentDay.getMonth() && currentDate.getFullYear() === currentDay.getFullYear()) {
            dateDiv.classList.add("current");
        }
        // Устанавливаем кнопку выбора
        dateDiv.onclick = () => {
            const selected = document.querySelector(".selected");
            // handleDateClick(i);
            handleDateClick(i, currentDate.getMonth() + 1, currentDate.getFullYear()); // Передаем день, месяц и год
            if (selected) selected.classList.remove("selected");
            dateDiv.classList.add("selected");
            updateSelectedProgramsList();
        };

        datesContainer.appendChild(dateDiv);
    }
}

prevBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};
nextBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};
selectMonthBtn.onclick = () => {
    monthModal.style.display = "block";
    highlightCurrentMonth();
};
selectYearBtn.onclick = () => {
    yearModal.style.display = "block";
    highlightCurrentYear();
};
closeMonthModal.onclick = () => {
    monthModal.style.display = "none";
};
closeYearModal.onclick = () => {
    yearModal.style.display = "none";
};
document.querySelectorAll(".month-btn").forEach(button => {
    button.onclick = () => {

        const month = button.getAttribute("data-month");
        currentDate.setMonth(month);
        monthModal.style.display = "none";
        renderCalendar();
    };
});

let displayedYear = currentDate.getFullYear(); // Переменная для отслеживания отображаемого года
function renderYearButtons() {
    const yearsContainer = document.getElementById("yearsContainer");
    yearsContainer.innerHTML = ""; // Очищаем и перезаполняем контейнер
    const currentYear = displayedYear; // Отображаемый год для кнопок

    // Обновляем отображение года в заголовке
    document.getElementById("yearDisplay").innerText = currentYear;

    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const yearBtn = document.createElement("button");
        yearBtn.className = "year-btn";
        yearBtn.setAttribute("data-year", i);
        yearBtn.innerText = i;

        // Подсвечиваем текущий год
        if (i === currentDate.getFullYear()) {
            yearBtn.classList.add("current-year");
        }

        // Обработчик для кнопки года
        yearBtn.onclick = () => {
            currentDate.setFullYear(i);
            yearModal.style.display = "none"; // Закрываем модальное окно
            renderCalendar(); // Обновляем календарь
        };

        yearsContainer.appendChild(yearBtn); // Добавляем кнопку в контейнер
    }
}

// Обработчики для стрелочек
document.getElementById("prevYearBtn").onclick = () => {
    displayedYear -= 1; // Уменьшаем отображаемый год
    renderYearButtons(); // Обновляем кнопки годов
};

document.getElementById("nextYearBtn").onclick = () => {
    displayedYear += 1; // Увеличиваем отображаемый год
    renderYearButtons(); // Обновляем кнопки годов
};

// Изменение вызова функции
selectYearBtn.onclick = () => {
    yearModal.style.display = "block"; // Показываем модальное окно
    displayedYear = currentDate.getFullYear(); // Сбрасываем на текущий год
    renderYearButtons(); // Генерируем кнопки годов
};

// Остальной код остается тем же...

function highlightCurrentMonth() {
    const currentMonth = new Date().getMonth();
    document.querySelectorAll(".month-btn").forEach(button => {
        button.classList.remove("current-month");
        if (button.getAttribute("data-month") == currentMonth) {
            button.classList.add("current-month");
        }
    });
}

function highlightCurrentYear() {
    const currentYear = new Date().getFullYear();
    yearButtons.forEach(button => {
        button.classList.remove("current-year");
        if (button.getAttribute("data-year") == currentYear) {
            button.classList.add("current-year");
        }
    });
}

window.onclick = (event) => {
    if (event.target === monthModal || event.target === yearModal) {
        monthModal.style.display = "none";
        yearModal.style.display = "none";
    }
};
// При загрузке страницы, проверяем наличие данных в localStorage
window.onload = () => {
    const storedDates = localStorage.getItem("sharedArrayWithDates");
    if (storedDates) {
        sharedArrayWithDates = JSON.parse(storedDates);
    }

    // Запускаем календарь
    renderCalendar();
};

// Календарь
// Календарь
// Календарь
// Календарь













// Тренировки в календаре
// Тренировки в календаре
// Тренировки в календаре
// Тренировки в календаре

    const sportCalendarInfoTrainingButtonAdd = document.getElementById('sportCalendarInfoTrainingButtonAdd');
    const sportCalendarInfoTrainingModalTrainingAdd = document.getElementById('sportCalendarInfoTrainingModalTrainingAdd');
    const sportCalendarInfoTrainingModalTrainingInfo = document.getElementById('sportCalendarInfoTrainingModalTrainingInfo');
    const sportCalendarInfoTrainingList = document.getElementById('sportCalendarInfoTrainingList');
    const sportCalendarInfoTrainingModalTrainingButtonAdd = document.getElementById('sportCalendarInfoTrainingList');
    
    // Открытие модального окна
    sportCalendarInfoTrainingButtonAdd.onclick = function() {
        // Проверяем, есть ли выбранные даты
        const selectedDateElement = document.querySelector('#datesContainer .date.selected'); // Поиск элемента с классом "date selected"

        if (selectedDateElement) {
            // Если элемент найден, показываем модальное окно
            sportCalendarInfoTrainingModalTrainingAdd.style.display = 'flex'; // Показываем модальное окно
            displayAvailablePrograms(); // Отображение доступных программ
        } else {
            // Иначе показываем ошибку
            alert('Пожалуйста, выберите дату.'); // Всплывающее сообщение об ошибке
        }
    };

    // Закрытие модального окна
    document.querySelector('.modalCloseAddTraining').onclick = function() {
        sportCalendarInfoTrainingModalTrainingAdd.style.display = 'none'; // Закрываем модальное окно
    };
 
// Для хранения выбранных программ
let selectedPrograms = [];

// Функция для отображения доступных программ
function displayAvailablePrograms() {
    sportCalendarInfoTrainingModalTrainingInfo.innerHTML = ''; // Очищаем контейнер

    arrayOfPrograms.forEach(program => {
        const programItem = document.createElement('div');
        programItem.textContent = `Тренировка: ${program.title}, ID: ${program.id}, Цвет: ${program.color}`;
        programItem.style.backgroundColor = program.color;
        programItem.style.padding = "10px";
        programItem.style.margin = "5px 0";

        const description = document.createElement('div');
        description.textContent = `Описание: ${program.description}`;
        programItem.appendChild(description); // Добавляем описание

        const primaryClass = document.createElement('div');
        primaryClass.textContent = `Основной класс: ${program.primaryClass}`;
        programItem.appendChild(primaryClass);

        const secondaryClass = document.createElement('div');
        secondaryClass.textContent = `Вторичный класс: ${program.secondaryClass}`;
        programItem.appendChild(secondaryClass);

        const selectButton = document.createElement('button');
selectButton.textContent = 'Выбрать';
selectButton.className = "sportCalendarInfoTrainingModalTrainingSelectClass"; // Исправлена ошибка в классе

selectButton.onclick = function() {
    // Проверяем, есть ли программа уже в выбранных
    if (!selectedPrograms.some(p => p.id === program.id)) {
        selectedPrograms.push(program); // Добавляем программу в массив выбранных
        selectButton.style.backgroundColor = 'lightgreen'; // Изменяем стиль для индикации выбора
    } else {
        // Программа уже выбрана, убираем выделение и удаляем из массива
        selectedPrograms = selectedPrograms.filter(p => p.id !== program.id); // Удаляем программу из массива
        selectButton.style.backgroundColor = ''; // Сбрасываем стиль кнопки
    }
};

        // Отображаем упражнения под программой
        const exercisesList = document.createElement('div');
        program.exercises.forEach(ex => {
            const exerciseItem = document.createElement('div');
            exerciseItem.textContent = `Упражнение: ${ex.title}, ID: ${ex.id}, Цвет: ${ex.color}`;
            exerciseItem.style.backgroundColor = ex.color;

            const exerciseDescription = document.createElement('div');
            exerciseDescription.textContent = `Описание: ${ex.description}`;
            exerciseItem.appendChild(exerciseDescription);

            const primaryClass = document.createElement('div');
            primaryClass.textContent = `Основной класс: ${ex.primaryClass}`;
            exerciseItem.appendChild(primaryClass);

            const secondaryClass = document.createElement('div');
            secondaryClass.textContent = `Вторичный класс: ${ex.secondaryClass}`;
            exerciseItem.appendChild(secondaryClass);

            exercisesList.appendChild(exerciseItem);
        });

        programItem.appendChild(selectButton);
        programItem.appendChild(exercisesList);

        sportCalendarInfoTrainingModalTrainingInfo.appendChild(programItem);
    });
}

// Кнопка добавления программ
document.getElementById('sportCalendarInfoTrainingModalTrainingButtonAdd').addEventListener('click', function() {
    selectedPrograms.forEach(program => {
        addProgramToSelectedList(program); // Добавляем каждую выбранную программу
    });
    updateSelectedProgramsList(); // Обновляем список выбранных программ
    selectedPrograms = []; // Очищаем массив после добавления
});

// Функция для добавления программы в список выбранных
function addProgramToSelectedList(program) {
    // Проверяем, существует ли массив selectedDateKey
    const dateKeys = selectedDateKey;

    if (dateKeys.length !== 3) {
        console.error('selectedDateKey должен содержать 3 значения.');
        return;
    }

    const [yearKey, monthKey, dayKey] = dateKeys;

    sharedArrayWithDates[yearKey] = sharedArrayWithDates[yearKey] || {};
    sharedArrayWithDates[yearKey][monthKey] = sharedArrayWithDates[yearKey][monthKey] || {};
    sharedArrayWithDates[yearKey][monthKey][dayKey] = sharedArrayWithDates[yearKey][monthKey][dayKey] || [];

    const dayArray = sharedArrayWithDates[yearKey][monthKey][dayKey];
    if (!dayArray.some(p => p.id === program.id)) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        
        // Добавляем дату к названию программы
        program.title += ` (Добавлено: ${formattedDate})`; // Изменяем название программы
        
        dayArray.push(program);
        // alert(`Программа добавлена для этой даты: ${formattedDate}`);
    } else {
        alert('Программа уже добавлена для этой даты.');
    }

    localStorage.setItem('sharedArrayWithDates', JSON.stringify(sharedArrayWithDates));
    updateSelectedProgramsList(); 
}

// Обновление списка выбранных программ
function updateSelectedProgramsList() {
    sportCalendarInfoTrainingList.innerHTML = ''; // Очищаем список перед обновлением
    
    const dateKeys = selectedDateKey;
    if (dateKeys.length !== 3) {
        console.error('Должно быть 3 значения для выбранной даты.');
        return;
    }

    const [yearKey, monthKey, dayKey] = dateKeys;

    const dayPrograms = sharedArrayWithDates[yearKey]?.[monthKey]?.[dayKey] || [];

    dayPrograms.forEach(program => {
        const programItem = document.createElement('div');
        programItem.textContent = program.title; // Название добавленной программы (уже с датой)

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.id = "sportCalendarInfoTrainingListButtonDelete";
        deleteButton.onclick = function() {
            removeProgramFromSelectedList(program.id);
            updateSelectedProgramsList(); 
        };

        const exercisesList = document.createElement('div');
        program.exercises.forEach(ex => {
            const exerciseItem = document.createElement('div');
            exerciseItem.textContent = `Упражнение: ${ex.title}, ID: ${ex.id}`; // Указываем ID и название

            const doneButton = document.createElement('button');
            doneButton.textContent = 'Выполнить';
            doneButton.id = "sportCalendarInfoTrainingListExercisesDone"; 
            doneButton.onclick = function() {
                alert(`Выполнено: ${ex.title}`); 
            };

            exerciseItem.appendChild(doneButton);
            exercisesList.appendChild(exerciseItem);
        });

        programItem.appendChild(deleteButton);
        programItem.appendChild(exercisesList); 

        sportCalendarInfoTrainingList.appendChild(programItem); 
    });
}

// Удаление программы из массива по ключу dayKey
function removeProgramFromSelectedList(programId) {
    // Извлекаем ключи даты
    const dateKeys = selectedDateKey;
    if (dateKeys.length !== 3) {
        console.error('Должно быть 3 значения для выбранной даты.');
        return;
    }

    const [yearKey, monthKey, dayKey] = dateKeys;

    // Получаем массив программ для выбранной даты
    const dayPrograms = sharedArrayWithDates[yearKey]?.[monthKey]?.[dayKey];

    if (!dayPrograms) {
        console.log('Нет программ для удаления.');
        return;
    }

    // Находим индекс программы по programId
    const index = dayPrograms.findIndex(program => program.id === programId);
    
    if (index > -1) {
        dayPrograms.splice(index, 1); // Удаляем программу из массива
        
        // Сохраняем обновленный sharedArrayWithDates в localStorage
        localStorage.setItem('sharedArrayWithDates', JSON.stringify(sharedArrayWithDates));

        // Обновляем отображение
        updateSelectedProgramsList();
    } else {
        console.log('Программа не найдена для удаления.');
    }
}

    // Добавление выбранных программ из модального окна в список
    document.getElementById('sportCalendarInfoTrainingModalTrainingButtonAdd').onclick = function() {
        // Закрыть модальное окно
        sportCalendarInfoTrainingModalTrainingAdd.style.display = 'none';
    };
    
// Тренировки в календаре
// Тренировки в календаре
// Тренировки в календаре
// Тренировки в календаре












// Выполнение упражнения
// Выполнение упражнения
// Выполнение упражнения
// Выполнение упражнения










// Выполнение упражнения
// Выполнение упражнения
// Выполнение упражнения
// Выполнение упражнения










// регистрация service worker
// регистрация service worker
// регистрация service worker
// регистрация service worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован:', registration);
            })
            .catch(error => {
                console.error('Ошибка регистрации Service Worker:', error);
            });
    });
}


// регистрация service worker
// регистрация service worker
// регистрация service worker
// регистрация service worker