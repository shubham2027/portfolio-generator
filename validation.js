// Organized JavaScript for FolioForge
// This file handles form validation and portfolio preview generation

// Global variables
let portfolioForm;
let formContainer;
let previewContainer;
let createBtn;
let backButtons;
let saveBtn;
let loadBtn;
let clearBtn;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    setupFormHandlers();
    checkForSavedPortfolios();
});

// Initialize DOM elements
function initializeElements() {
    portfolioForm = document.getElementById('portfolioForm');
    formContainer = document.getElementById('formContainer');
    previewContainer = document.getElementById('portfolioPreview');
    createBtn = document.getElementById('createPortfolio');
    backButtons = document.querySelectorAll('#backToForm, #backToFormFloat');
    saveBtn = document.getElementById('savePortfolio');
    loadBtn = document.getElementById('loadPortfolio');
    clearBtn = document.getElementById('clearForm');
}

// Set up event listeners for various elements
function setupEventListeners() {
    // Back to form buttons
    backButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showForm();
        });
    });
    
    // Create portfolio button
    if (createBtn) {
        createBtn.addEventListener('click', validateAndCreatePortfolio);
    }
    
    // Save portfolio button
    if (saveBtn) {
        saveBtn.addEventListener('click', savePortfolioToLocalStorage);
    }
    
    // Load portfolio button
    if (loadBtn) {
        loadBtn.addEventListener('click', function() {
            const savedPortfoliosContainer = document.getElementById('savedPortfolios');
            if (savedPortfoliosContainer) {
                savedPortfoliosContainer.style.display = savedPortfoliosContainer.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    // Clear form button
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all form fields? This action cannot be undone.')) {
                clearFormFields();
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Check if there are any saved portfolios in local storage
function checkForSavedPortfolios() {
    try {
        const savedPortfolios = JSON.parse(localStorage.getItem('folioForgePortfolios')) || [];
        
        // Create the saved portfolios dropdown if it doesn't exist
        let savedPortfoliosContainer = document.getElementById('savedPortfolios');
        if (!savedPortfoliosContainer && savedPortfolios.length > 0) {
            // Add a load button next to the create button
            const buttonContainer = createBtn.parentElement;
            
            // Create the load button if it doesn't exist
            if (!document.getElementById('loadPortfolio')) {
                loadBtn = document.createElement('button');
                loadBtn.id = 'loadPortfolio';
                loadBtn.className = 'bg-gray-700 px-8 py-3 rounded-md text-lg ml-4';
                loadBtn.textContent = 'Load Saved';
                buttonContainer.appendChild(loadBtn);
                
                // Add event listener
                loadBtn.addEventListener('click', function() {
                    const savedPortfoliosContainer = document.getElementById('savedPortfolios');
                    if (savedPortfoliosContainer) {
                        savedPortfoliosContainer.style.display = savedPortfoliosContainer.style.display === 'none' ? 'block' : 'none';
                    }
                });
            }
            
            // Create the saved portfolios dropdown
            savedPortfoliosContainer = document.createElement('div');
            savedPortfoliosContainer.id = 'savedPortfolios';
            savedPortfoliosContainer.className = 'mt-4 bg-gray-800 rounded-lg p-4';
            savedPortfoliosContainer.style.display = 'none';
            
            const heading = document.createElement('h3');
            heading.className = 'text-lg font-semibold mb-3';
            heading.textContent = 'Your Saved Portfolios';
            savedPortfoliosContainer.appendChild(heading);
            
            const list = document.createElement('div');
            list.className = 'space-y-2';
            
            savedPortfolios.forEach((portfolio, index) => {
                const item = document.createElement('div');
                item.className = 'flex justify-between items-center p-2 bg-gray-700 rounded';
                
                const name = document.createElement('span');
                name.textContent = portfolio.name || `Portfolio ${index + 1}`;
                item.appendChild(name);
                
                const actions = document.createElement('div');
                actions.className = 'space-x-2';
                
                const loadAction = document.createElement('button');
                loadAction.className = 'accent-bg px-3 py-1 rounded text-sm';
                loadAction.textContent = 'Load';
                loadAction.addEventListener('click', function() {
                    loadPortfolioFromLocalStorage(index);
                    savedPortfoliosContainer.style.display = 'none';
                });
                actions.appendChild(loadAction);
                
                const deleteAction = document.createElement('button');
                deleteAction.className = 'bg-red-500 px-3 py-1 rounded text-sm';
                deleteAction.textContent = 'Delete';
                deleteAction.addEventListener('click', function() {
                    if (confirm('Are you sure you want to delete this saved portfolio?')) {
                        deletePortfolioFromLocalStorage(index);
                        checkForSavedPortfolios(); // Refresh the list
                    }
                });
                actions.appendChild(deleteAction);
                
                item.appendChild(actions);
                list.appendChild(item);
            });
            
            savedPortfoliosContainer.appendChild(list);
            buttonContainer.parentElement.appendChild(savedPortfoliosContainer);
        }
    } catch (error) {
        console.error('Error checking for saved portfolios:', error);
    }
}

// Save portfolio data to local storage
function savePortfolioToLocalStorage() {
    try {
        const formData = new FormData(portfolioForm);
        const portfolioData = {
            name: formData.get('fullName'),
            profession: formData.get('profession'),
            aboutMe: formData.get('aboutMe'),
            email: formData.get('email'),
            location: formData.get('location'),
            skills: formData.getAll('skills[]').filter(s => s.trim()),
            experience: getExperienceData(formData),
            projects: getProjectsData(formData),
            linkedin: formData.get('linkedin'),
            github: formData.get('github'),
            savedDate: new Date().toISOString()
        };
        
        // Get existing saved portfolios
        const savedPortfolios = JSON.parse(localStorage.getItem('folioForgePortfolios')) || [];
        
        // Add the new portfolio
        savedPortfolios.push(portfolioData);
        
        // Save back to local storage
        localStorage.setItem('folioForgePortfolios', JSON.stringify(savedPortfolios));
        
        // Show success message
        alert('Portfolio saved successfully!');
        
        // Update the saved portfolios dropdown
        checkForSavedPortfolios();
        
        // Add save button to preview if it doesn't exist
        addSaveButtonToPreview();
    } catch (error) {
        console.error('Error saving portfolio:', error);
        alert('There was an error saving your portfolio. Please try again.');
    }
}

// Helper function to get experience data
function getExperienceData(formData) {
    const titles = formData.getAll('expTitle[]');
    const companies = formData.getAll('expCompany[]');
    const dates = formData.getAll('expDates[]');
    const descriptions = formData.getAll('expDescription[]');
    
    const experienceData = [];
    
    for (let i = 0; i < titles.length; i++) {
        if (titles[i].trim() || companies[i].trim()) {
            experienceData.push({
                title: titles[i],
                company: companies[i],
                dates: dates[i],
                description: descriptions[i]
            });
        }
    }
    
    return experienceData;
}

// Helper function to get projects data
function getProjectsData(formData) {
    const titles = formData.getAll('projectTitle[]');
    const descriptions = formData.getAll('projectDescription[]');
    const urls = formData.getAll('projectUrl[]');
    
    const projectsData = [];
    
    for (let i = 0; i < titles.length; i++) {
        if (titles[i].trim()) {
            projectsData.push({
                title: titles[i],
                description: descriptions[i],
                url: urls[i]
            });
        }
    }
    
    return projectsData;
}

// Load a portfolio from local storage
function loadPortfolioFromLocalStorage(index) {
    try {
        const savedPortfolios = JSON.parse(localStorage.getItem('folioForgePortfolios')) || [];
        
        if (savedPortfolios[index]) {
            const portfolioData = savedPortfolios[index];
            
            // Clear existing form fields
            clearFormFields();
            
            // Fill in the form fields
            document.getElementById('fullName').value = portfolioData.name || '';
            document.getElementById('profession').value = portfolioData.profession || '';
            document.getElementById('aboutMe').value = portfolioData.aboutMe || '';
            document.getElementById('email').value = portfolioData.email || '';
            document.getElementById('location').value = portfolioData.location || '';
            document.getElementById('linkedin').value = portfolioData.linkedin || '';
            document.getElementById('github').value = portfolioData.github || '';
            
            // Fill in skills
            if (portfolioData.skills && portfolioData.skills.length > 0) {
                const skillsContainer = document.getElementById('skillsContainer');
                skillsContainer.innerHTML = '';
                
                portfolioData.skills.forEach(skill => {
                    const skillDiv = document.createElement('div');
                    skillDiv.className = 'flex space-x-2 mb-2';
                    skillDiv.innerHTML = `
                        <input type="text" name="skills[]" value="${skill}" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                        <button type="button" class="remove-item px-3 bg-red-500 rounded-md" aria-label="Remove">✕</button>
                    `;
                    skillsContainer.appendChild(skillDiv);
                    
                    // Add remove functionality
                    skillDiv.querySelector('.remove-item').addEventListener('click', function() {
                        skillsContainer.removeChild(skillDiv);
                    });
                });
            }
            
            // Fill in experience
            if (portfolioData.experience && portfolioData.experience.length > 0) {
                const experienceContainer = document.getElementById('experienceContainer');
                experienceContainer.innerHTML = '';
                
                portfolioData.experience.forEach(exp => {
                    const expDiv = document.createElement('div');
                    expDiv.className = 'border-b border-gray-700 pb-4 mb-4';
                    expDiv.innerHTML = `
                        <div class="flex justify-end mb-2">
                            <button type="button" class="remove-item px-2 py-1 bg-red-500 rounded-md text-sm" aria-label="Remove">Remove</button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-2">Job Title</label>
                                <input type="text" name="expTitle[]" value="${exp.title || ''}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                            </div>
                            <div>
                                <label class="block mb-2">Company</label>
                                <input type="text" name="expCompany[]" value="${exp.company || ''}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block mb-2">Dates</label>
                            <input type="text" name="expDates[]" value="${exp.dates || ''}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="e.g., 2020-Present">
                        </div>
                        <div class="mt-4">
                            <label class="block mb-2">Description</label>
                            <textarea name="expDescription[]" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">${exp.description || ''}</textarea>
                        </div>
                    `;
                    experienceContainer.appendChild(expDiv);
                    
                    // Add remove functionality
                    expDiv.querySelector('.remove-item').addEventListener('click', function() {
                        experienceContainer.removeChild(expDiv);
                    });
                });
            }
            
            // Fill in projects
            if (portfolioData.projects && portfolioData.projects.length > 0) {
                const projectsContainer = document.getElementById('projectsContainer');
                projectsContainer.innerHTML = '';
                
                portfolioData.projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.className = 'border-b border-gray-700 pb-4 mb-4';
                    projectDiv.innerHTML = `
                        <div class="flex justify-end mb-2">
                            <button type="button" class="remove-item px-2 py-1 bg-red-500 rounded-md text-sm" aria-label="Remove">Remove</button>
                        </div>
                        <div>
                            <label class="block mb-2">Project Title</label>
                            <input type="text" name="projectTitle[]" value="${project.title || ''}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                        </div>
                        <div class="mt-4">
                            <label class="block mb-2">Description</label>
                            <textarea name="projectDescription[]" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">${project.description || ''}</textarea>
                        </div>
                        <div class="mt-4">
                            <label class="block mb-2">Project URL</label>
                            <input type="url" name="projectUrl[]" value="${project.url || ''}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="https://...">
                        </div>
                    `;
                    projectsContainer.appendChild(projectDiv);
                    
                    // Add remove functionality
                    projectDiv.querySelector('.remove-item').addEventListener('click', function() {
                        projectsContainer.removeChild(projectDiv);
                    });
                });
            }
            
            alert('Portfolio loaded successfully!');
        }
    } catch (error) {
        console.error('Error loading portfolio:', error);
        alert('There was an error loading your portfolio. Please try again.');
    }
}

// Delete a portfolio from local storage
function deletePortfolioFromLocalStorage(index) {
    try {
        const savedPortfolios = JSON.parse(localStorage.getItem('folioForgePortfolios')) || [];
        
        if (savedPortfolios[index]) {
            // Remove the portfolio at the specified index
            savedPortfolios.splice(index, 1);
            
            // Save back to local storage
            localStorage.setItem('folioForgePortfolios', JSON.stringify(savedPortfolios));
        }
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        alert('There was an error deleting your portfolio. Please try again.');
    }
}

// Clear all form fields
function clearFormFields() {
    // Reset text fields
    document.getElementById('fullName').value = '';
    document.getElementById('profession').value = '';
    document.getElementById('aboutMe').value = '';
    document.getElementById('email').value = '';
    document.getElementById('location').value = '';
    document.getElementById('linkedin').value = '';
    document.getElementById('github').value = '';
    
    // Reset skills
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = `
        <div class="flex space-x-2 mb-2">
            <input type="text" name="skills[]" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="E.g., Web Development">
        </div>
        <div class="flex space-x-2 mb-2">
            <input type="text" name="skills[]" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="E.g., Graphic Design">
        </div>
    `;
    
    // Reset experience
    const experienceContainer = document.getElementById('experienceContainer');
    experienceContainer.innerHTML = `
        <div class="border-b border-gray-700 pb-4 mb-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2">Job Title</label>
                    <input type="text" name="expTitle[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                </div>
                <div>
                    <label class="block mb-2">Company</label>
                    <input type="text" name="expCompany[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                </div>
            </div>
            <div class="mt-4">
                <label class="block mb-2">Dates</label>
                <input type="text" name="expDates[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="e.g., 2020-Present">
            </div>
            <div class="mt-4">
                <label class="block mb-2">Description</label>
                <textarea name="expDescription[]" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"></textarea>
            </div>
        </div>
    `;
    
    // Reset projects
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = `
        <div class="border-b border-gray-700 pb-4 mb-4">
            <div>
                <label class="block mb-2">Project Title</label>
                <input type="text" name="projectTitle[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
            </div>
            <div class="mt-4">
                <label class="block mb-2">Description</label>
                <textarea name="projectDescription[]" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"></textarea>
            </div>
            <div class="mt-4">
                <label class="block mb-2">Project URL</label>
                <input type="url" name="projectUrl[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="https://...">
            </div>
        </div>
    `;
}

// Add save button to preview if it doesn't exist
function addSaveButtonToPreview() {
    const previewNav = document.querySelector('#portfolioPreview nav .flex.space-x-4');
    
    if (previewNav && !document.getElementById('savePortfolioBtn')) {
        const saveBtn = document.createElement('a');
        saveBtn.id = 'savePortfolioBtn';
        saveBtn.href = '#';
        saveBtn.className = 'accent';
        saveBtn.textContent = 'Save Portfolio';
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            savePortfolioToLocalStorage();
        });
        
        previewNav.appendChild(saveBtn);
    }
}

// Setup dynamic form handlers for adding fields
function setupFormHandlers() {
    // Add skill button
    const addSkillBtn = document.getElementById('addSkill');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            const container = document.getElementById('skillsContainer');
            const newSkill = document.createElement('div');
            newSkill.className = 'flex space-x-2 mb-2';
            newSkill.innerHTML = `
                <input type="text" name="skills[]" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="Enter a skill">
                <button type="button" class="remove-item px-3 bg-red-500 rounded-md" aria-label="Remove">✕</button>
            `;
            container.appendChild(newSkill);
            
            // Add remove functionality
            newSkill.querySelector('.remove-item').addEventListener('click', function() {
                container.removeChild(newSkill);
            });
        });
    }
    
    // Add experience button
    const addExpBtn = document.getElementById('addExperience');
    if (addExpBtn) {
        addExpBtn.addEventListener('click', function() {
            const container = document.getElementById('experienceContainer');
            const newExp = document.createElement('div');
            newExp.className = 'border-b border-gray-700 pb-4 mb-4';
            newExp.innerHTML = `
                <div class="flex justify-end mb-2">
                    <button type="button" class="remove-item px-2 py-1 bg-red-500 rounded-md text-sm" aria-label="Remove">Remove</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2">Job Title</label>
                        <input type="text" name="expTitle[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                    </div>
                    <div>
                        <label class="block mb-2">Company</label>
                        <input type="text" name="expCompany[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                    </div>
                </div>
                <div class="mt-4">
                    <label class="block mb-2">Dates</label>
                    <input type="text" name="expDates[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="e.g., 2020-Present">
                </div>
                <div class="mt-4">
                    <label class="block mb-2">Description</label>
                    <textarea name="expDescription[]" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"></textarea>
                </div>
            `;
            container.appendChild(newExp);
            
            // Add remove functionality
            newExp.querySelector('.remove-item').addEventListener('click', function() {
                container.removeChild(newExp);
            });
        });
    }
    
    // Add project button
    const addProjectBtn = document.getElementById('addProject');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            const container = document.getElementById('projectsContainer');
            const newProject = document.createElement('div');
            newProject.className = 'border-b border-gray-700 pb-4 mb-4';
            newProject.innerHTML = `
                <div class="flex justify-end mb-2">
                    <button type="button" class="remove-item px-2 py-1 bg-red-500 rounded-md text-sm" aria-label="Remove">Remove</button>
                </div>
                <div>
                    <label class="block mb-2">Project Title</label>
                    <input type="text" name="projectTitle[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                </div>
                <div class="mt-4">
                    <label class="block mb-2">Description</label>
                    <textarea name="projectDescription[]" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"></textarea>
                </div>
                <div class="mt-4">
                    <label class="block mb-2">Project URL</label>
                    <input type="url" name="projectUrl[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="https://...">
                </div>
            `;
            container.appendChild(newProject);
            
            // Add remove functionality
            newProject.querySelector('.remove-item').addEventListener('click', function() {
                container.removeChild(newProject);
            });
        });
    }
}

// Show/hide sections
function showPreview() {
    formContainer.style.display = 'none';
    previewContainer.style.display = 'block';
    window.scrollTo(0, 0);
    
    // Add save button to preview
    addSaveButtonToPreview();
    
    // Create floating back button if it doesn't exist
    if (!document.getElementById('backToFormFloat')) {
        const backBtn = document.createElement('a');
        backBtn.id = 'backToFormFloat';
        backBtn.href = '#';
        backBtn.className = 'back-to-form';
        backBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';
        document.body.appendChild(backBtn);
        
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showForm();
        });
    }
}

function showForm() {
    formContainer.style.display = 'block';
    previewContainer.style.display = 'none';
    window.scrollTo(0, 0);
    
    // Remove floating back button if it exists
    const backBtn = document.getElementById('backToFormFloat');
    if (backBtn) {
        backBtn.remove();
    }
}

// Validate the form and create portfolio
function validateAndCreatePortfolio() {
    if (validateForm()) {
        updatePortfolio();
        showPreview();
    }
}

// Form validation
function validateForm() {
    const requiredFields = ['fullName', 'profession', 'aboutMe', 'email'];
    let isValid = true;
    let firstInvalidField = null;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));
    
    // Check required fields
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
            
            // Show error message
            const errorMsg = document.createElement('p');
            errorMsg.className = 'text-red-500 text-sm mt-1 error-message';
            errorMsg.textContent = 'This field is required';
            field.parentNode.appendChild(errorMsg);
            
            if (!firstInvalidField) firstInvalidField = field;
        }
    }
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('border-red-500');
            
            const errorMsg = document.createElement('p');
            errorMsg.className = 'text-red-500 text-sm mt-1 error-message';
            errorMsg.textContent = 'Please enter a valid email address';
            emailField.parentNode.appendChild(errorMsg);
            
            if (!firstInvalidField) firstInvalidField = emailField;
        }
    }
    
    // Focus on first invalid field
    if (firstInvalidField) {
        firstInvalidField.focus();
    }
    
    return isValid;
}

// Update portfolio preview
function updatePortfolio() {
    const formData = new FormData(portfolioForm);
    
    try {
        // Update basic info
        updateBasicInfo(formData);
        
        // Update location
        updateLocation(formData);
        
        // Update contact section
        updateContact(formData);
        
        // Update skills section
        updateSkills(formData);
        
        // Update experience section
        updateExperience(formData);
        
        // Update projects section
        updateProjects(formData);
    } catch (error) {
        console.error('Error updating portfolio:', error);
        alert('There was an error creating your portfolio. Please try again.');
    }
}

// Update basic info in preview
function updateBasicInfo(formData) {
    document.getElementById('preview-name').textContent = formData.get('fullName');
    document.getElementById('preview-profession').textContent = formData.get('profession');
    document.getElementById('preview-about').innerHTML = formData.get('aboutMe').replace(/\n/g, '<br>');
}

// Update location in preview
function updateLocation(formData) {
    const location = formData.get('location');
    const locationContainer = document.getElementById('preview-location-container');
    
    if (location && location.trim()) {
        document.getElementById('preview-location').textContent = '📍 ' + location;
        locationContainer.style.display = 'block';
    } else {
        locationContainer.style.display = 'none';
    }
}

// Update contact section in preview
function updateContact(formData) {
    const contactContainer = document.getElementById('preview-contact');
    contactContainer.innerHTML = '';
    
    // Email button
    const email = formData.get('email');
    if (email) {
        const emailBtn = document.createElement('a');
        emailBtn.href = 'mailto:' + email;
        emailBtn.className = 'bg-gray-900 text-white px-4 py-2 rounded-md';
        emailBtn.textContent = 'Contact Me';
        contactContainer.appendChild(emailBtn);
    }
    
    // Social links
    const linkedin = formData.get('linkedin');
    const github = formData.get('github');
    
    if (linkedin) {
        const link = document.createElement('a');
        link.href = linkedin;
        link.target = '_blank';
        link.className = 'text-white ml-2';
        link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;
        contactContainer.appendChild(link);
    }
    
    if (github) {
        const link = document.createElement('a');
        link.href = github;
        link.target = '_blank';
        link.className = 'text-white ml-2';
        link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
        contactContainer.appendChild(link);
    }
}

// Helper functions for updating sections
function updateSkills(formData) {
    const skillsContainer = document.getElementById('preview-skills');
    const skillsSection = document.getElementById('preview-skills-section');
    const skills = formData.getAll('skills[]').filter(skill => skill.trim() !== '');
    
    if (skills.length > 0) {
        skillsContainer.innerHTML = '';
        
        skills.forEach(skill => {
            if (skill.trim()) {
                const span = document.createElement('span');
                span.className = 'bg-gray-700 text-white px-3 py-1 rounded-full border accent-border';
                span.textContent = skill;
                skillsContainer.appendChild(span);
            }
        });
        
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
}

function updateExperience(formData) {
    const experienceContainer = document.getElementById('preview-experience');
    const experienceSection = document.getElementById('preview-experience-section');
    const titles = formData.getAll('expTitle[]');
    const companies = formData.getAll('expCompany[]');
    const dates = formData.getAll('expDates[]');
    const descriptions = formData.getAll('expDescription[]');
    
    let hasExperience = false;
    for (let i = 0; i < titles.length; i++) {
        if (titles[i].trim() || companies[i].trim()) {
            hasExperience = true;
            break;
        }
    }
    
    if (hasExperience) {
        experienceContainer.innerHTML = '';
        
        for (let i = 0; i < titles.length; i++) {
            if (!titles[i].trim() && !companies[i].trim()) continue;
            
            const entry = document.createElement('div');
            entry.className = 'mb-6';
            
            let html = `<div class="flex flex-col md:flex-row md:justify-between mb-2">`;
            
            if (titles[i]) {
                html += `<h3 class="text-xl font-semibold accent">
                    ${titles[i]}
                    ${companies[i] ? `<span class="text-gray-400"> at ${companies[i]}</span>` : ''}
                </h3>`;
            } else if (companies[i]) {
                html += `<h3 class="text-xl font-semibold accent">${companies[i]}</h3>`;
            }
            
            if (dates[i]) {
                html += `<span class="text-gray-400">${dates[i]}</span>`;
            }
            
            html += `</div>`;
            
            if (descriptions[i]) {
                html += `<p class="text-gray-300">${descriptions[i].replace(/\n/g, '<br>')}</p>`;
            }
            
            entry.innerHTML = html;
            experienceContainer.appendChild(entry);
        }
        
        experienceSection.style.display = 'block';
    } else {
        experienceSection.style.display = 'none';
    }
}

function updateProjects(formData) {
    const projectsContainer = document.getElementById('preview-projects');
    const projectsSection = document.getElementById('preview-projects-section');
    const projectTitles = formData.getAll('projectTitle[]');
    const projectDescriptions = formData.getAll('projectDescription[]');
    const projectUrls = formData.getAll('projectUrl[]');
    
    let hasProjects = false;
    for (let i = 0; i < projectTitles.length; i++) {
        if (projectTitles[i].trim()) {
            hasProjects = true;
            break;
        }
    }
    
    if (hasProjects) {
        projectsContainer.innerHTML = '';
        
        for (let i = 0; i < projectTitles.length; i++) {
            if (!projectTitles[i].trim()) continue;
            
            const project = document.createElement('div');
            project.className = 'bg-gray-800 rounded-lg p-6 border accent-border';
            
            let html = `<h3 class="text-xl font-semibold accent mb-3">${projectTitles[i]}</h3>`;
            
            if (projectDescriptions[i]) {
                html += `<p class="text-gray-300 mb-4">${projectDescriptions[i].replace(/\n/g, '<br>')}</p>`;
            }
            
            if (projectUrls[i]) {
                html += `<a href="${projectUrls[i]}" target="_blank" class="inline-block accent-bg text-white px-4 py-2 rounded">View Project</a>`;
            }
            
            project.innerHTML = html;
            projectsContainer.appendChild(project);
        }
        
        projectsSection.style.display = 'block';
    } else {
        projectsSection.style.display = 'none';
    }
}
