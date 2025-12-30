/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message');

const showToast = (message, type) => {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
};

const sendEmail = (e) => {
    e.preventDefault();

    // Validate form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (!nameInput.value.trim()) {
        showToast('Veuillez entrer votre nom.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showToast('Veuillez entrer une adresse email valide.', 'error');
        return;
    }

    if (!subjectInput.value.trim()) {
        showToast('Veuillez entrer l\'objet du message.', 'error');
        return;
    }

    if (!messageInput.value.trim()) {
        showToast('Veuillez entrer votre message.', 'error');
        return;
    }

    // Add timestamp
    const timestamp = new Date().toLocaleString();

    // Send email using EmailJS
    emailjs.send(
        'service_3vhci2i',
        'template_5x7bnx9',
        {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value,
            timestamp: timestamp
        },
        'dZrTlc2yCJID4aelZ'
    )
    .then(() => {
        // Show success toast
        showToast('Message envoyé avec succès', 'success');

        // Clear input fields
        contactForm.reset();
    }, () => {
        // Show error toast
        showToast('Échec de l\'envoi du message (erreur de service)', 'error');
    });
};

contactForm.addEventListener('submit', sendEmail);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                    : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id'),
                sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true, // Animation repeat
})

sr.reveal(`.perfil, .contact__form`)
sr.reveal(`.info`, { origin: 'left', delay: 800 })
sr.reveal(`.skills`, { origin: 'left', delay: 1000 })
sr.reveal(`.about`, { origin: 'right', delay: 1200 })
sr.reveal(`.projects__card, .services__card`, { interval: 100 })

/*=============== FORM VALIDATION ===============*/
const validateForm = () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (!nameInput.value.trim()) {
        alert('Please enter your name.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!messageInput.value.trim()) {
        alert('Please enter your message.');
        return false;
    }

    return true;
};

contactForm.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault();
    }
});

// Ensure WOW.js is loaded before initialization
if (typeof WOW === 'undefined') {
    console.error('WOW.js library is not loaded. Please ensure the script is included before this file.');
} else {
    new WOW().init();
}
