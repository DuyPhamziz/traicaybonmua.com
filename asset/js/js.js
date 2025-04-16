const listImage = document.querySelector('.list-images');
const imgs = document.getElementsByTagName('img');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const length = imgs.length;
let current = 0;
let width = imgs[0].offsetWidth; 


const updateSlide = () => {
    listImage.style.transform = `translateX(${width * -1 * current}px)`;
    document.querySelector('.active').classList.remove('active');
    document.querySelector(`.index-item-${current}`).classList.add('active');
}


const handleChangeSlide = () => {
    current = (current + 1) % length; 
    updateSlide();
}


let handleEventChangeSlide = setInterval(handleChangeSlide, 4000);


btnRight.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide); 
    handleChangeSlide(); 
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000); 
});


btnLeft.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide); 
    current = (current - 1 + length) % length; 
    updateSlide();
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000); 
});
