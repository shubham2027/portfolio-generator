// FolioForge Portfolio Generator JavaScript
// Handles form validation and instant portfolio preview
document.addEventListener('DOMContentLoaded', function() {
    // Form validation and handling
    const portfolioForm = document.getElementById('portfolioForm');
    const formContainer = document.getElementById('formContainer');
    const previewContainer = document.getElementById('portfolioPreview');
    const backToFormButton = document.getElementById('backToForm');
    
    // Function to show the portfolio preview
    function showPortfolioPreview() {
        if (formContainer && previewContainer) {
            formContainer.style.display = 'none';
            previewContainer.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }
    
    // Function to show the form and hide preview
    function showForm() {
        if (formContainer && previewContainer) {
            formContainer.style.display = 'block';
            previewContainer.style.display = 'none';
            window.scrollTo(0, 0);
        }
    }
    
    // Back to form button click handlers
    if (backToFormButton) {
        backToFormButton.addEventListener('click', function(e) {
            e.preventDefault();
            showForm();
        });
    }
    
    // Floating back button
    const backToFormFloat = document.getElementById('backToFormFloat');
    if (backToFormFloat) {
        backToFormFloat.addEventListener('click', function(e) {
            e.preventDefault();
            showForm();
        });
    }
    
    // Form submission handler with client-side validation
    if (portfolioForm) {
        portfolioForm.addEventListener('submit', function(e) {
            // Prevent default form submission
            e.preventDefault();
            
            // Basic validation
            const requiredFields = ['fullName', 'profession', 'aboutMe', 'email'];
            let isValid = true;
            let firstInvalidField = null;

            // Check required fields
            for (const fieldId of requiredFields) {
                const field = document.getElementById(fieldId);
                if (!field || !field.value.trim()) {
                    isValid = false;
                    if (field) {
                        field.classList.add('border-red-500');
                        if (!firstInvalidField) firstInvalidField = field;
                    }
                } else if (field) {
                    field.classList.remove('border-red-500');
                }
            }

            // Validate email format
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
                isValid = false;
                emailField.classList.add('border-red-500');
                if (!firstInvalidField) firstInvalidField = emailField;
            }
            
            // If form is valid, generate the portfolio preview
            if (isValid) {
                generatePortfolioPreview();
                showPortfolioPreview();
            } else {
                // Focus on first invalid field
                if (firstInvalidField) firstInvalidField.focus();
                alert('Please check the form for errors and try again.');
            }
        });
    }
    
    // Function to generate portfolio preview from form data
    function generatePortfolioPreview() {
        // Collect form data
        const formData = new FormData(portfolioForm);
        
        // Update portfolio preview with form data
        document.getElementById('preview-name').textContent = formData.get('fullName');
        document.getElementById('preview-profession').textContent = formData.get('profession');
        document.getElementById('preview-about').innerHTML = nl2br(formData.get('aboutMe'));
        
        // Update contact information
        const email = formData.get('email');
        if (email) {
            document.getElementById('preview-email').href = 'mailto:' + email;
            document.getElementById('preview-email').style.display = 'inline-block';
        } else {
            document.getElementById('preview-email').style.display = 'none';
        }
        
        // Update location
        const location = formData.get('location');
        if (location) {
            document.getElementById('preview-location').textContent = location;
            document.getElementById('preview-location-container').style.display = 'flex';
        } else {
            document.getElementById('preview-location-container').style.display = 'none';
        }
        
        // Update phone
        const phone = formData.get('phone');
        if (phone) {
            document.getElementById('preview-phone').textContent = phone;
            document.getElementById('preview-phone-container').style.display = 'flex';
        } else {
            document.getElementById('preview-phone-container').style.display = 'none';
        }
        
        // Update skills
        updateSkillsPreview(formData);
        
        // Update experience
        updateExperiencePreview(formData);
        
        // Update education
        updateEducationPreview(formData);
        
        // Update projects
        updateProjectsPreview(formData);
        
        // Update social links
        updateSocialLinksPreview(formData);
    }
    
    // Helper function to convert newlines to <br> tags
    function nl2br(str) {
        if (!str) return '';
        return str.replace(/\n/g, '<br>');
    }
    
    // Update skills preview
    function updateSkillsPreview(formData) {
        const skillsContainer = document.getElementById('preview-skills-container');
        const skillsList = document.getElementById('preview-skills');
        
        if (!skillsContainer || !skillsList) return;
        
        // Get all skills
        const skills = formData.getAll('skills[]').filter(skill => skill.trim() !== '');
        
        if (skills.length > 0) {
            // Clear existing skills
            skillsList.innerHTML = '';
            
            // Add each skill
            skills.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'bg-gray-700 text-white px-3 py-1 rounded-full inline-block m-1 border border-[#8758FF]';
                span.textContent = skill;
                skillsList.appendChild(span);
            });
            
            // Show the skills section
            skillsContainer.style.display = 'block';
        } else {
            // Hide the skills section if no skills
            skillsContainer.style.display = 'none';
        }
    }
    
    // Update experience preview
    function updateExperiencePreview(formData) {
        const experienceContainer = document.getElementById('preview-experience-container');
        const experienceList = document.getElementById('preview-experience');
        
        if (!experienceContainer || !experienceList) return;
        
        // Get all experience titles
        const titles = formData.getAll('expTitle[]');
        const companies = formData.getAll('expCompany[]');
        const startDates = formData.getAll('expStartDate[]');
        const endDates = formData.getAll('expEndDate[]');
        const descriptions = formData.getAll('expDescription[]');
        
        // Check if there's any valid experience entry
        let hasExperience = false;
        for (let i = 0; i < titles.length; i++) {
            if (titles[i].trim() !== '' || companies[i].trim() !== '') {
                hasExperience = true;
                break;
            }
        }
        
        if (hasExperience) {
            // Clear existing experience entries
            experienceList.innerHTML = '';
            
            // Add each experience entry
            for (let i = 0; i < titles.length; i++) {
                if (titles[i].trim() === '' && companies[i].trim() === '') continue;
                
                const div = document.createElement('div');
                div.className = 'mb-8 last:mb-0';
                
                let html = `
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 class="text-xl font-semibold text-[#8758FF]">
                            ${titles[i] || ''}
                            ${companies[i] ? `<span class="text-gray-400"> at ${companies[i]}</span>` : ''}
                        </h3>
                `;
                
                if (startDates[i] || endDates[i]) {
                    html += `<span class="text-gray-400 mt-1 md:mt-0">`;
                    if (startDates[i]) html += startDates[i];
                    if (startDates[i] && endDates[i]) html += ' - ';
                    if (endDates[i]) html += endDates[i];
                    html += `</span>`;
                }
                
                html += `</div>`;
                
                if (descriptions[i]) {
                    html += `<p class="text-gray-300">${nl2br(descriptions[i])}</p>`;
                }
                
                div.innerHTML = html;
                experienceList.appendChild(div);
            }
            
            // Show the experience section
            experienceContainer.style.display = 'block';
        } else {
            // Hide the experience section if no experience
            experienceContainer.style.display = 'none';
        }
    }
    
    // Update education preview
    function updateEducationPreview(formData) {
        const educationContainer = document.getElementById('preview-education-container');
        const educationList = document.getElementById('preview-education');
        
        if (!educationContainer || !educationList) return;
        
        // Get all education entries
        const degrees = formData.getAll('eduDegree[]');
        const institutions = formData.getAll('eduInstitution[]');
        const years = formData.getAll('eduYear[]');
        
        // Check if there's any valid education entry
        let hasEducation = false;
        for (let i = 0; i < degrees.length; i++) {
            if (degrees[i].trim() !== '' || institutions[i].trim() !== '') {
                hasEducation = true;
                break;
            }
        }
        
        if (hasEducation) {
            // Clear existing education entries
            educationList.innerHTML = '';
            
            // Add each education entry
            for (let i = 0; i < degrees.length; i++) {
                if (degrees[i].trim() === '' && institutions[i].trim() === '') continue;
                
                const div = document.createElement('div');
                div.className = 'mb-6 last:mb-0';
                
                let html = `
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 class="text-xl font-semibold text-[#8758FF]">
                            ${degrees[i] || ''}
                            ${institutions[i] ? `<span class="text-gray-400"> - ${institutions[i]}</span>` : ''}
                        </h3>
                `;
                
                if (years[i]) {
                    html += `<span class="text-gray-400 mt-1 md:mt-0">${years[i]}</span>`;
                }
                
                html += `</div>`;
                
                div.innerHTML = html;
                educationList.appendChild(div);
            }
            
            // Show the education section
            educationContainer.style.display = 'block';
        } else {
            // Hide the education section if no education
            educationContainer.style.display = 'none';
        }
    }
    
    // Update projects preview
    function updateProjectsPreview(formData) {
        const projectsContainer = document.getElementById('preview-projects-container');
        const projectsList = document.getElementById('preview-projects');
        
        if (!projectsContainer || !projectsList) return;
        
        // Get all project entries
        const titles = formData.getAll('projectTitle[]');
        const descriptions = formData.getAll('projectDescription[]');
        const urls = formData.getAll('projectUrl[]');
        
        // Check if there's any valid project entry
        let hasProjects = false;
        for (let i = 0; i < titles.length; i++) {
            if (titles[i].trim() !== '') {
                hasProjects = true;
                break;
            }
        }
        
        if (hasProjects) {
            // Clear existing project entries
            projectsList.innerHTML = '';
            
            // Add each project entry
            for (let i = 0; i < titles.length; i++) {
                if (titles[i].trim() === '') continue;
                
                const div = document.createElement('div');
                div.className = 'bg-gray-800 rounded-lg p-6 border border-[#8758FF]';
                
                let html = `<h3 class="text-xl font-semibold text-[#8758FF] mb-3">${titles[i]}</h3>`;
                
                if (descriptions[i]) {
                    html += `<p class="text-gray-300 mb-4">${nl2br(descriptions[i])}</p>`;
                }
                
                if (urls[i]) {
                    html += `
                        <a href="${urls[i]}" target="_blank" class="inline-block bg-[#8758FF] text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
                            View Project
                        </a>
                    `;
                }
                
                div.innerHTML = html;
                projectsList.appendChild(div);
            }
            
            // Show the projects section
            projectsContainer.style.display = 'block';
        } else {
            // Hide the projects section if no projects
            projectsContainer.style.display = 'none';
        }
    }
    
    // Update social links preview
    function updateSocialLinksPreview(formData) {
        const socialLinksContainer = document.getElementById('preview-social-links');
        
        if (!socialLinksContainer) return;
        
        // Get all social links
        const linkedin = formData.get('linkedin');
        const github = formData.get('github');
        const twitter = formData.get('twitter');
        const website = formData.get('website');
        
        // Check if there's any social link
        const hasSocialLinks = linkedin || github || twitter || website;
        
        if (hasSocialLinks) {
            // Clear existing social links
            socialLinksContainer.innerHTML = '';
            
            // Add LinkedIn link
            if (linkedin) {
                const a = document.createElement('a');
                a.href = linkedin;
                a.target = '_blank';
                a.className = 'text-white hover:text-[#8758FF]';
                a.setAttribute('aria-label', 'LinkedIn');
                a.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                `;
                socialLinksContainer.appendChild(a);
            }
            
            // Add GitHub link
            if (github) {
                const a = document.createElement('a');
                a.href = github;
                a.target = '_blank';
                a.className = 'text-white hover:text-[#8758FF]';
                a.setAttribute('aria-label', 'GitHub');
                a.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                `;
                socialLinksContainer.appendChild(a);
            }
            
            // Add Twitter link
            if (twitter) {
                const a = document.createElement('a');
                a.href = twitter;
                a.target = '_blank';
                a.className = 'text-white hover:text-[#8758FF]';
                a.setAttribute('aria-label', 'Twitter');
                a.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                `;
                socialLinksContainer.appendChild(a);
            }
            
            // Add Website link
            if (website) {
                const a = document.createElement('a');
                a.href = website;
                a.target = '_blank';
                a.className = 'text-white hover:text-[#8758FF]';
                a.setAttribute('aria-label', 'Website');
                a.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                `;
                socialLinksContainer.appendChild(a);
            }
            
            // Show the social links container
            socialLinksContainer.parentElement.style.display = 'flex';
        } else {
            // Hide the social links container if no links
            socialLinksContainer.parentElement.style.display = 'none';
        }
    }

    // Add more skill fields
    const addSkillButton = document.getElementById('addSkill');
    if (addSkillButton) {
        addSkillButton.addEventListener('click', function() {
            const skillsContainer = document.getElementById('skillsContainer');
            const newSkillEntry = document.createElement('div');
            newSkillEntry.className = 'skill-entry flex space-x-2 mb-2';
            newSkillEntry.innerHTML = `
                <input type="text" name="skills[]" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="Enter skill">
                <button type="button" class="remove-skill bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300">
                    Remove
                </button>
            `;
            skillsContainer.appendChild(newSkillEntry);

            // Add event listener to the remove button
            const removeButton = newSkillEntry.querySelector('.remove-skill');
            removeButton.addEventListener('click', function() {
                skillsContainer.removeChild(newSkillEntry);
            });
        });
    }

    // Add more experience fields
    const addExperienceButton = document.getElementById('addExperience');
    if (addExperienceButton) {
        addExperienceButton.addEventListener('click', function() {
            const experienceContainer = document.getElementById('experienceContainer');
            const newExperienceEntry = document.createElement('div');
            newExperienceEntry.className = 'experience-entry border-b border-gray-700 pb-4 mb-4';
            newExperienceEntry.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-300 mb-2">Job Title</label>
                        <input type="text" name="expTitle[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]">
                    </div>
                    <div>
                        <label class="block text-gray-300 mb-2">Company</label>
                        <input type="text" name="expCompany[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-gray-300 mb-2">Start Date</label>
                        <input type="text" name="expStartDate[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="e.g., Jan 2020">
                    </div>
                    <div>
                        <label class="block text-gray-300 mb-2">End Date</label>
                        <input type="text" name="expEndDate[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="e.g., Present">
                    </div>
                </div>
                <div class="mt-4">
                    <label class="block text-gray-300 mb-2">Description</label>
                    <textarea name="expDescription[]" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]"></textarea>
                </div>
                <button type="button" class="remove-experience mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                    Remove Experience
                </button>
            `;
            experienceContainer.appendChild(newExperienceEntry);

            // Add event listener to the remove button
            const removeButton = newExperienceEntry.querySelector('.remove-experience');
            removeButton.addEventListener('click', function() {
                experienceContainer.removeChild(newExperienceEntry);
            });
        });
    }

    // Add more education fields
    const addEducationButton = document.getElementById('addEducation');
    if (addEducationButton) {
        addEducationButton.addEventListener('click', function() {
            const educationContainer = document.getElementById('educationContainer');
            const newEducationEntry = document.createElement('div');
            newEducationEntry.className = 'education-entry border-b border-gray-700 pb-4 mb-4';
            newEducationEntry.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-300 mb-2">Degree/Certificate</label>
                        <input type="text" name="eduDegree[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]">
                    </div>
                    <div>
                        <label class="block text-gray-300 mb-2">Institution</label>
                        <input type="text" name="eduInstitution[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-gray-300 mb-2">Year</label>
                        <input type="text" name="eduYear[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="e.g., 2018-2022">
                    </div>
                </div>
                <button type="button" class="remove-education mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                    Remove Education
                </button>
            `;
            educationContainer.appendChild(newEducationEntry);

            // Add event listener to the remove button
            const removeButton = newEducationEntry.querySelector('.remove-education');
            removeButton.addEventListener('click', function() {
                educationContainer.removeChild(newEducationEntry);
            });
        });
    }

    // Add more project fields
    const addProjectButton = document.getElementById('addProject');
    if (addProjectButton) {
        addProjectButton.addEventListener('click', function() {
            const projectsContainer = document.getElementById('projectsContainer');
            const newProjectEntry = document.createElement('div');
            newProjectEntry.className = 'project-entry border-b border-gray-700 pb-4 mb-4';
            newProjectEntry.innerHTML = `
                <div>
                    <label class="block text-gray-300 mb-2">Project Title</label>
                    <input type="text" name="projectTitle[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]">
                </div>
                <div class="mt-4">
                    <label class="block text-gray-300 mb-2">Description</label>
                    <textarea name="projectDescription[]" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]"></textarea>
                </div>
                <div class="mt-4">
                    <label class="block text-gray-300 mb-2">Project URL (Optional)</label>
                    <input type="url" name="projectUrl[]" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="https://...">
                </div>
                <button type="button" class="remove-project mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                    Remove Project
                </button>
            `;
            projectsContainer.appendChild(newProjectEntry);

            // Add event listener to the remove button
            const removeButton = newProjectEntry.querySelector('.remove-project');
            removeButton.addEventListener('click', function() {
                projectsContainer.removeChild(newProjectEntry);
            });
        });
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});