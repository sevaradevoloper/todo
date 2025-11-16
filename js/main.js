// 1. VOQEA BOG'LOVCHI (Event Listener)
// Brauzer HTMLni to'liq o'qib bo'lganda (DOM yuklanganda),
// 'loadTasks' funksiyasini ishga tushiradi.
// Bu kod JS faylning eng yuqorisida bo'lgani uchun,
// HTML elementlari tayyor bo'lishini kutish juda muhim.
document.addEventListener("DOMContentLoaded", loadTasks);

// 2. VAZIFALARNI YUKLASH FUNKSIYASI (Local Storage'dan)
function loadTasks() {
    // Brauzer xotirasidan (Local Storage) 'todoTasks' kaliti bo'yicha ma'lumotni oladi.
    // Ma'lumotlar matn (JSON string) formatida keladi. Masalan: '["Ish1", "Ish2"]'
    const tasksJSON = localStorage.getItem("todoTasks");
    
    // JSON.parse() - olingan matnni haqiqiy JavaScript massiviga (array) o'giradi.
    // Masalan: '["Ish1", "Ish2"]' -> ["Ish1", "Ish2"]
    const tasks = JSON.parse(tasksJSON);
    
    // Agar 'tasks' mavjud bo'lsa (ya'ni xotira bo'sh bo'lmasa)
    if (tasks) {
        // tasks.forEach(...) - massivdagi HAR BIR element (text) uchun 
        // ichkaridagi funksiyani alohida ishga tushiradi.
        // Bu "for" tsiklining zamonaviy ko'rinishi.
        tasks.forEach(text => {
            // Har bir matn uchun ekranga chizuvchi funksiyani chaqiramiz
            createTaskElement(text);
        });
    }
}

// 3. YANGI VAZIFA QO'SHISH FUNKSIYASI
// Bu funksiya HTMLdagi "Add" tugmasi bosilganda (onclick="addToDo()") ishlaydi.
function addToDo() {
    // Input maydonini ID si ('text') orqali topamiz
    const input = document.getElementById("text");
    // Input ichidagi matnni olamiz va '.trim()' orqali chetdagi bo'shliqlarni olib tashlaymiz
    const text = input.value.trim();
    
    // Agar input bo'sh bo'lsa (text === ""), funksiya shu yerda to'xtaydi.
    if (text === "") return; 

    // Matnni ekranga chizish uchun yordamchi funksiyaga yuboramiz
    createTaskElement(text);
    
    // Yangi qo'shilgan vazifani xotiraga saqlaymiz
    saveTasks();
    
    // Input maydonini keyingi yozish uchun tozalaymiz
    input.value = "";
}

// 4. VAZIFANI O'CHIRISH FUNKSIYASI
// Bu funksiya HTMLdagi "delete" tugmasi bosilganda (onclick="deleteToDo(this)") ishlaydi.
// 'this' - bu aynan bosilgan tugmaning o'zi. Biz uni 'button' deb nomladik.
function deleteToDo(button) {
    // .parentElement - bu tugmaning "ota elementi", ya'ni '<li>'
    const li = button.parentElement;
    // 'li' elementini sahifadan (DOMdan) butunlay o'chirib tashlaydi
    li.remove();
    
    // Ro'yxat o'zgargani uchun xotirani yangilaymiz
    saveTasks();
}

// 5. YORDAMCHI FUNKSIYA: EKRANGA CHIZISH
// Bu funksiya yangi '<li>' elementini yaratadi va uni ro'yxatga qo'shadi.
// Biz buni ikki marta (yuklashda va qo'shishda) ishlatganimiz uchun alohida funksiya qildik.
function createTaskElement(text) {
    // Yangi 'li' HTML elementi yaratamiz
    const li = document.createElement("li");
    
    // 'li' ning ichki HTMLini (innerHTML) belgilaymiz.
    // Bu yerda matn uchun '<span>' va o'chirish tugmasi 'button' yaratiladi.
    // backtick (`) yordamida matn ichiga o'zgaruvchi (${text}) qo'sha olamiz.
    li.innerHTML = `<span>${text}</span><button onclick="deleteToDo(this)">delete</button>`;
    
    // Ro'yxatni (ul) ID si ('taskList') orqali topamiz
    const ul = document.getElementById("taskList");
    
    // Yangi yaratilgan 'li' ni 'ul' ning oxiriga (ichiga) qo'shamiz
    ul.appendChild(li);
}

// 6. YORDAMCHI FUNKSIYA: XOTIRAGA SAQLASH
// Bu funksiya ekrandagi BARCHA vazifalarni yig'ib, xotiraga (Local Storage) saqlaydi.
// U har safar task qo'shilganda yoki o'chirilganda chaqiriladi.
function saveTasks() {
    // Ma'lumotlarni saqlash uchun bo'sh massiv (array) ochamiz
    const tasks = [];
    
    // '#taskList li span' - bu CSS selektor. U "taskList ichidagi barcha li, ularning ichidagi barcha spanlarni top" degani.
    // .querySelectorAll() - topilgan barcha elementlarni ro'yxat (NodeList) qilib qaytaradi.
    // .forEach() - topilgan har bir 'span' uchun quyidagi ishni bajaradi:
    document.querySelectorAll("#taskList li span").forEach(span => {
        // Har bir 'span' ichidagi matnni (.textContent) olib,
        // 'tasks' massiviga qo'shadi (.push).
        tasks.push(span.textContent.trim());
    });
    
    // localStorage.setItem() - xotiraga ma'lumot yozadi.
    // Biz 'todoTasks' nomli kalitga 'tasks' massivini saqlayapmiz.
    // Lekin xotiraga faqat matn saqlash mumkin, shuning uchun massivni
    // JSON.stringify() yordamida matnga (JSON string) o'giramiz.
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}