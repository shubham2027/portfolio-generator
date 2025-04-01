<?php
// FolioForge - Simplified Portfolio Generator (Python-free version)
session_start();
$pageTitle = "FolioForge - Create Your Portfolio";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    
    <!-- Tailwind CSS from CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Tailwind Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#181818',
                        'accent': '#8758FF',
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="custom.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
    
    <meta name="description" content="FolioForge - Create a professional portfolio in minutes with our easy-to-use portfolio generator.">
</head>
<body class="font-sans bg-[#181818] text-gray-100 min-h-screen flex flex-col">
    <!-- Header/Navigation -->
    <nav class="bg-[#181818] border-b border-[#8758FF] shadow-md">
        <div class="container mx-auto px-6 py-3">
            <div class="flex justify-between items-center">
                <a href="index.php" class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#8758FF] w-8 h-8">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <span class="text-xl font-bold text-white">FolioForge</span>
                </a>
                <div class="flex items-center space-x-4">
                    <a href="index.php" class="text-[#8758FF] hover:text-white transition duration-300">Home</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="min-h-screen bg-[#181818] flex flex-col">
        <!-- Form Container -->
        <div id="formContainer">
            <main class="flex-grow container mx-auto px-4 py-8">
                <div class="text-center mb-12">
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to FolioForge</h1>
                    <p class="text-xl text-[#8758FF]">Create a professional portfolio with one click</p>
                </div>

                <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6 md:p-8 text-white">
                    <h2 class="text-2xl font-semibold text-white mb-6">Enter Your Details</h2>

                    <?php if (isset($_SESSION['success'])): ?>
                        <div class="bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded mb-6" role="alert">
                            <p><?php echo $_SESSION['success']; ?></p>
                        </div>
                        <?php unset($_SESSION['success']); ?>
                    <?php endif; ?>

                    <?php if (isset($_SESSION['error'])): ?>
                        <div class="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mb-6" role="alert">
                            <p><?php echo $_SESSION['error']; ?></p>
                        </div>
                        <?php unset($_SESSION['error']); ?>
                    <?php endif; ?>

                    <!-- Simple Portfolio Form - Fills in preview instantly -->
                    <form id="portfolioForm" class="space-y-6">
                        <!-- Personal Information -->
                        <div class="bg-gray-800 p-4 rounded-lg border border-[#8758FF]">
                            <h3 class="text-xl font-medium text-[#8758FF] mb-4">Personal Information</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="fullName" class="block text-gray-300 mb-2">Full Name*</label>
                                    <input type="text" id="fullName" name="fullName" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" required>
                                </div>
                                <div>
                                    <label for="profession" class="block text-gray-300 mb-2">Profession/Title*</label>
                                    <input type="text" id="profession" name="profession" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" required>
                                </div>
                            </div>
                            <div class="mt-4">
                                <label for="aboutMe" class="block text-gray-300 mb-2">About Me*</label>
                                <textarea id="aboutMe" name="aboutMe" rows="4" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" required></textarea>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label for="email" class="block text-gray-300 mb-2">Email*</label>
                                    <input type="email" id="email" name="email" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" required>
                                </div>
                                <div>
                                    <label for="phone" class="block text-gray-300 mb-2">Phone</label>
                                    <input type="tel" id="phone" name="phone" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]">
                                </div>
                            </div>
                            <div class="mt-4">
                                <label for="location" class="block text-gray-300 mb-2">Location</label>
                                <input type="text" id="location" name="location" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]">
                            </div>
                        </div>

                        <!-- Skills -->
                        <div class="bg-gray-800 p-4 rounded-lg border border-[#8758FF]">
                            <h3 class="text-xl font-medium text-[#8758FF] mb-4">Skills</h3>
                            <div id="skillsContainer">
                                <div class="skill-entry flex space-x-2 mb-2">
                                    <input type="text" name="skills[]" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="E.g., Web Development">
                                </div>
                                <div class="skill-entry flex space-x-2 mb-2">
                                    <input type="text" name="skills[]" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="E.g., Graphic Design">
                                </div>
                            </div>
                            <button type="button" id="addSkill" class="mt-2 bg-[#8758FF] text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                                Add Skill
                            </button>
                        </div>

                        <!-- Experience -->
                        <div class="bg-gray-800 p-4 rounded-lg border border-[#8758FF]">
                            <h3 class="text-xl font-medium text-[#8758FF] mb-4">Experience</h3>
                            <div id="experienceContainer">
                                <div class="experience-entry border-b border-gray-700 pb-4 mb-4">
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
                                </div>
                            </div>
                            <button type="button" id="addExperience" class="mt-2 bg-[#8758FF] text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                                Add Experience
                            </button>
                        </div>

                        <!-- Education -->
                        <div class="bg-gray-800 p-4 rounded-lg border border-[#8758FF]">
                            <h3 class="text-xl font-medium text-[#8758FF] mb-4">Education</h3>
                            <div id="educationContainer">
                                <div class="education-entry border-b border-gray-700 pb-4 mb-4">
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
                                </div>
                            </div>
                            <button type="button" id="addEducation" class="mt-2 bg-[#8758FF] text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                                Add Education
                            </button>
                        </div>

                        <!-- Projects -->
                        <div class="bg-gray-800 p-4 rounded-lg border border-[#8758FF]">
                            <h3 class="text-xl font-medium text-[#8758FF] mb-4">Projects</h3>
                            <div id="projectsContainer">
                                <div class="project-entry border-b border-gray-700 pb-4 mb-4">
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
                                </div>
                            </div>
                            <button type="button" id="addProject" class="mt-2 bg-[#8758FF] text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                                Add Project
                            </button>
                        </div>

                        <!-- Social Links -->
                        <div class="bg-gray-800 p-4 rounded-lg border border-[#8758FF]">
                            <h3 class="text-xl font-medium text-[#8758FF] mb-4">Social Links</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="linkedin" class="block text-gray-300 mb-2">LinkedIn</label>
                                    <input type="url" id="linkedin" name="linkedin" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="https://linkedin.com/in/username">
                                </div>
                                <div>
                                    <label for="github" class="block text-gray-300 mb-2">GitHub</label>
                                    <input type="url" id="github" name="github" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="https://github.com/username">
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label for="twitter" class="block text-gray-300 mb-2">Twitter</label>
                                    <input type="url" id="twitter" name="twitter" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="https://twitter.com/username">
                                </div>
                                <div>
                                    <label for="website" class="block text-gray-300 mb-2">Personal Website</label>
                                    <input type="url" id="website" name="website" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8758FF]" placeholder="https://yourwebsite.com">
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="bg-[#8758FF] text-white px-8 py-3 rounded-md hover:bg-purple-700 transition duration-300 text-lg">
                                Create Portfolio
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>

        <!-- Portfolio Preview Container -->
        <div id="portfolioPreview" class="min-h-screen bg-[#181818]" style="display: none;">
            <!-- Navigation -->
            <nav class="bg-[#181818] border-b border-[#8758FF] shadow-md">
                <div class="container mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="index.php" class="flex items-center">
                        <span class="text-white text-xl font-semibold">FolioForge</span>
                    </a>
                    <div class="flex space-x-4">
                        <a id="backToForm" href="#" class="text-[#8758FF] hover:text-white transition duration-300">
                            Edit Portfolio
                        </a>
                        <a href="#" onclick="window.print();" class="text-[#8758FF] hover:text-white transition duration-300">
                            Print Portfolio
                        </a>
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <header class="bg-[#8758FF] text-white py-16">
                <div class="container mx-auto px-6 text-center">
                    <h1 id="preview-name" class="text-4xl md:text-5xl font-bold mb-4">Your Name</h1>
                    <p id="preview-profession" class="text-xl mb-8">Your Profession</p>
                    <div class="flex justify-center space-x-4">
                        <a id="preview-email" href="mailto:" class="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition duration-300">
                            Contact Me
                        </a>
                        
                        <div id="preview-social-links" class="flex space-x-3">
                            <!-- Social links will be added here by JavaScript -->
                        </div>
                    </div>
                </div>
            </header>

            <main class="container mx-auto px-4 py-12">
                <!-- About Section -->
                <section class="mb-16">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md p-8">
                        <h2 class="text-2xl font-bold text-[#8758FF] border-b-2 border-[#8758FF] pb-2 mb-6">About Me</h2>
                        <p id="preview-about" class="text-gray-300 leading-relaxed">Your bio will appear here.</p>
                        
                        <div class="mt-6 flex flex-wrap gap-4">
                            <div id="preview-location-container" class="flex items-center text-gray-400" style="display: none;">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-[#8758FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span id="preview-location"></span>
                            </div>
                            
                            <div id="preview-phone-container" class="flex items-center text-gray-400" style="display: none;">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-[#8758FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span id="preview-phone"></span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Skills Section -->
                <section id="preview-skills-container" class="mb-16" style="display: none;">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md p-8">
                        <h2 class="text-2xl font-bold text-[#8758FF] border-b-2 border-[#8758FF] pb-2 mb-6">Skills</h2>
                        <div id="preview-skills" class="flex flex-wrap gap-2">
                            <!-- Skills will be added here by JavaScript -->
                        </div>
                    </div>
                </section>
                
                <!-- Experience Section -->
                <section id="preview-experience-container" class="mb-16" style="display: none;">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md p-8">
                        <h2 class="text-2xl font-bold text-[#8758FF] border-b-2 border-[#8758FF] pb-2 mb-6">Experience</h2>
                        <div id="preview-experience">
                            <!-- Experience items will be added here by JavaScript -->
                        </div>
                    </div>
                </section>
                
                <!-- Education Section -->
                <section id="preview-education-container" class="mb-16" style="display: none;">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md p-8">
                        <h2 class="text-2xl font-bold text-[#8758FF] border-b-2 border-[#8758FF] pb-2 mb-6">Education</h2>
                        <div id="preview-education">
                            <!-- Education items will be added here by JavaScript -->
                        </div>
                    </div>
                </section>
                
                <!-- Projects Section -->
                <section id="preview-projects-container" class="mb-16" style="display: none;">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md p-8">
                        <h2 class="text-2xl font-bold text-[#8758FF] border-b-2 border-[#8758FF] pb-2 mb-6">Projects</h2>
                        <div id="preview-projects" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Project items will be added here by JavaScript -->
                        </div>
                    </div>
                </section>
                
                <!-- Print/Share Section -->
                <section class="mb-16 no-print">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md p-8 text-center">
                        <h2 class="text-2xl font-bold text-[#8758FF] mb-6">Want to share your portfolio?</h2>
                        <p class="text-gray-300 mb-6">Print or save your portfolio as PDF to share with employers and clients.</p>
                        <button onclick="window.print();" class="bg-[#8758FF] text-white px-8 py-3 rounded-md hover:bg-purple-700 transition duration-300 text-lg">
                            Print Portfolio
                        </button>
                    </div>
                </section>
            </main>
            
            <!-- Floating Back to Form Button -->
            <a href="#" id="backToFormFloat" class="back-to-form no-print">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 shadow-inner mt-auto text-white">
        <div class="container mx-auto px-6 py-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-6 md:mb-0">
                    <a href="index.php" class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#8758FF] w-6 h-6">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        <span class="text-lg font-semibold text-white">FolioForge</span>
                    </a>
                    <p class="text-[#8758FF] mt-2">Create a professional portfolio in minutes</p>
                </div>
                
                <div class="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
                    <div class="mb-4 md:mb-0">
                        <h3 class="text-[#8758FF] font-semibold mb-2">Quick Links</h3>
                        <ul class="space-y-2">
                            <li><a href="index.php" class="text-white hover:text-[#8758FF] transition duration-300">Home</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="text-[#8758FF] font-semibold mb-2">Contact</h3>
                        <ul class="space-y-2">
                            <li class="text-white">Email: contact@folioforge.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-6 text-center">
                <p class="text-white">&copy; <?php echo date('Y'); ?> FolioForge. All rights reserved.</p>
                <p class="text-sm text-[#8758FF] mt-2">A minimalist portfolio generator for creators</p>
            </div>
        </div>
    </footer>

    <script src="validation.js"></script>
</body>
</html>