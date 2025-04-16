
document.addEventListener("DOMContentLoaded", function () {
    
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            
            const email = document.getElementById('email').value;
            const title = document.getElementById('title').value;
            const message = document.querySelector('[name="message"]').value;

     
            if (email && title && message) {
                let contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];               
                contactMessages.push({ email, title, message });
                localStorage.setItem('contactMessages', JSON.stringify(contactMessages));               
                alert("Lời nhắn của bạn đã được gửi thành công!");
                
                contactForm.reset();             
                renderContactMessages();
            } else {
                
                alert("Vui lòng điền đầy đủ thông tin!");
            }
        });
    }

});

function renderContactMessages() {
    const contactMessagesList = document.getElementById("contact-messages-list");

    if (!contactMessagesList) {
        console.error("Không tìm thấy phần tử '#contact-messages-list'");
        return;
    }

    const contactMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];

   
    contactMessagesList.innerHTML = "";

    if (contactMessages.length === 0) {
        contactMessagesList.innerHTML = "<p>Chưa có lời nhắn nào.</p>";
    } else {
        contactMessages.forEach((message, index) => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message", "p-3", "mb-3");
            messageElement.style.border = "1px solid #ccc";
            messageElement.style.borderRadius = "8px";
            messageElement.style.backgroundColor = message.read ? "#e0ffe0" : "#fff"; 

            const currentDate = new Date().toLocaleString();

            messageElement.innerHTML = `
                <h5><strong>#${index + 1} - ${message.title}</strong> ${message.read ? '<span style="color: green;">(Đã đọc)</span>' : ''}</h5>
                <p><strong>Email:</strong> ${message.email}</p>
                <p><strong>Lời nhắn:</strong> ${message.message}</p>
                <p><strong>Ngày giờ:</strong> ${message.date || currentDate}</p>
                ${!message.read ? `<button class="btn btn-sm btn-success mark-read" data-index="${index}">Đánh dấu là đã đọc</button>` : ''}
            `;

            contactMessagesList.appendChild(messageElement);
        });

        
        const markReadButtons = document.querySelectorAll('.mark-read');
        markReadButtons.forEach(button => {
            button.addEventListener('click', function () {
                const messageIndex = button.getAttribute('data-index');
                markMessageAsRead(messageIndex);
            });
        });
    }
}

function markMessageAsRead(index) {
    const contactMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];

    if (contactMessages[index]) {
        contactMessages[index].read = true;
        localStorage.setItem("contactMessages", JSON.stringify(contactMessages));
        renderContactMessages();
    }
}


