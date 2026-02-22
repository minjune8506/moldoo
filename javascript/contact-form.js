// EmailJS configuration
const SERVICE_ID = 'service_5xf5e4r'; // Your EmailJS Service ID
const TEMPLATE_ID = 'template_74j1ki9'; // Your EmailJS Template ID
const PUBLIC_KEY = 'XxBtBsYNGvNeVg2iM'; // Your EmailJS Public Key

// Form validation and submission
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS after DOM is ready
    if (typeof emailjs !== 'undefined') {
        emailjs.init(PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const company = document.getElementById('company').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contactNumber').value.trim();
    const project = document.getElementById('project').value.trim();
    const budget = document.getElementById('budget').value.trim();
    const requirements = document.getElementById('requirements').value.trim();

    // Validate required fields (모든 필드 필수 제외 예산)
    if (!validateForm(company, project, contact, email, requirements)) {
        return;
    }

    // Validate phone number format
    if (!validatePhoneNumber(contact)) {
        alert('올바른 연락처 형식을 입력하세요. (예: 010-1234-5678)');
        return;
    }

    // Show loading state
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = '전송 중...';
    submitButton.disabled = true;

    // Prepare template parameters (include sender email)
    const templateParams = {
        company: company,
        project: project,
        contact: contact,
        sender: email,
        budget: budget || '미입력',
        requirements: requirements
    };

    // Send email using template (ensure EmailJS loaded)
    if (typeof emailjs === 'undefined') {
        alert('이메일 전송 서비스가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        return;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function (response) {
            alert('문의가 정상적으로 전송되었습니다. 빠른 시간 내에 연락드리겠습니다.');
            document.getElementById('contactForm').reset();
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        })
        .catch(function (error) {
            alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
}

function validateForm(company, project, contact, email, requirements) {
    // 회사명 검증
    if (!company) {
        alert('회사명(요청자명)을 입력하세요.');
        document.getElementById('company').focus();
        return false;
    }

    // 프로젝트명 검증
    if (!project) {
        alert('프로젝트명을 입력하세요.');
        document.getElementById('project').focus();
        return false;
    }

    // 연락처 검증
    if (!contact) {
        alert('연락처를 입력하세요.');
        document.getElementById('contactNumber').focus();
        return false;
    }

    // 이메일 검증 (선택이지만 형식이 입력되면 체크)
    if (!email) {
        alert('이메일을 입력하세요.');
        if (!validateEmail(email)) {
            alert('올바른 이메일 주소를 입력하세요. (예: moldoo.studio@gmail.com)');
            document.getElementById('email').focus();
            return false;
        }
    }

    // 문의사항 검증
    if (!requirements) {
        alert('문의사항을 입력하세요.');
        document.getElementById('requirements').focus();
        return false;
    }

    return true;
}

function validateEmail(email) {
    // 간단한 이메일 형식검사
    const re = /^[\w-.+]+@[\w-]+\.[\w-.]+$/;
    return re.test(email);
}

function validatePhoneNumber(phoneNumber) {
    // 하이픈 제거한 숫자만 추출
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // 010-0000-0000 형식 또는 02-0000-0000 형식 등 허용
    // 최소 9-11자리 숫자 확인
    if (digitsOnly.length < 9 || digitsOnly.length > 11) {
        return false;
    }

    return true;
}
