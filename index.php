<?php
// FolioForge - Simple Portfolio Generator
session_start();

// Handle theme selection
$theme = isset($_GET['theme']) ? $_GET['theme'] : 'modern';
$themeColors = [
    'creative' => [
        'primary' => '#8758FF',
        'background' => '#181818',
        'card' => '#1E1E1E',
        'text' => '#FFFFFF'
    ],
    'minimalist' => [
        'primary' => '#2A2A2A',
        'background' => '#FFFFFF',
        'card' => '#F5F5F5',
        'text' => '#000000'
    ],
    'professional' => [
        'primary' => '#444444',
        'background' => '#F0F2F5',
        'card' => '#FFFFFF',
        'text' => '#1A1A1A'
    ],
    'modern' => [
        'primary' => '#6B4EE6',
        'background' => '#181818',
        'card' => '#1E1E1E',
        'text' => '#FFFFFF'
    ]
];

$currentTheme = $themeColors[$theme];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FolioForge - Portfolio Generator</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="custom.css">
    
    <style>
        /* Essential styles */
        body { 
            background-color: <?php echo $currentTheme['background']; ?>; 
            color: <?php echo $currentTheme['text']; ?>; 
        }
        .accent { color: <?php echo $currentTheme['primary']; ?>; }
        .accent-bg { background-color: <?php echo $currentTheme['primary']; ?>; }
        .accent-border { border-color: <?php echo $currentTheme['primary']; ?>; }
        
        /* Print styles */
        @media print {
            .no-print { display: none !important; }
            body { background-color: white !important; color: black !important; }
        }
    </style>
</head>
<body class="min-h-screen flex flex-col">
    <!-- Header -->
    <nav class="bg-gray-900 border-b border-[#8758FF] shadow-md no-print">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <a href="home.php" class="flex items-center">
                    <span class="text-xl font-bold">Folio<span class="accent">Forge</span></span>
                </a>
                <div>
                    <a href="home.php" class="text-gray-300 hover:text-white">Back to Home</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="flex-grow">
        <!-- Form Container -->
        <div id="formContainer">
            <main class="container mx-auto px-4 py-8">
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold mb-2">Welcome to FolioForge</h1>
                    <p class="text-xl accent">Create your portfolio in one click</p>
                </div>

                <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6">
                    <h2 class="text-2xl font-semibold mb-6">Enter Your Details</h2>

                    <!-- Portfolio Form -->
                    <form id="portfolioForm" class="space-y-6">
                        <!-- Personal Information -->
                        <div class="bg-gray-800 p-4 rounded-lg border accent-border">
                            <h3 class="text-xl accent mb-4">Personal Information</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="fullName" class="block mb-2">Full Name*</label>
                                    <input type="text" id="fullName" name="fullName" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" required>
                                </div>
                                <div>
                                    <label for="profession" class="block mb-2">Profession/Title*</label>
                                    <input type="text" id="profession" name="profession" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" required>
                                </div>
                            </div>
                            <div class="mt-4">
                                <label for="aboutMe" class="block mb-2">About Me*</label>
                                <textarea id="aboutMe" name="aboutMe" rows="4" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" required></textarea>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label for="email" class="block mb-2">Email*</label>
                                    <input type="email" id="email" name="email" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" required>
                                </div>
                                <div>
                                    <label for="location" class="block mb-2">Location</label>
                                    <input type="text" id="location" name="location" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                                </div>
                            </div>
                        </div>

                        <!-- Skills -->
                        <div class="bg-gray-800 p-4 rounded-lg border accent-border">
                            <h3 class="text-xl accent mb-4">Skills</h3>
                            <div id="skillsContainer">
                                <div class="flex space-x-2 mb-2">
                                    <input type="text" name="skills[]" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="E.g., Web Development">
                                </div>
                                <div class="flex space-x-2 mb-2">
                                    <input type="text" name="skills[]" class="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="E.g., Graphic Design">
                                </div>
                            </div>
                            <button type="button" id="addSkill" class="mt-2 accent-bg px-4 py-2 rounded-md">
                                Add Skill
                            </button>
                        </div>

                        <!-- Experience -->
                        <div class="bg-gray-800 p-4 rounded-lg border accent-border">
                            <h3 class="text-xl accent mb-4">Experience</h3>
                            <div id="experienceContainer">
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
                            </div>
                            <button type="button" id="addExperience" class="mt-2 accent-bg px-4 py-2 rounded-md">
                                Add Experience
                            </button>
                        </div>

                        <!-- Projects -->
                        <div class="bg-gray-800 p-4 rounded-lg border accent-border">
                            <h3 class="text-xl accent mb-4">Projects</h3>
                            <div id="projectsContainer">
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
                            </div>
                            <button type="button" id="addProject" class="mt-2 accent-bg px-4 py-2 rounded-md">
                                Add Project
                            </button>
                        </div>

                        <!-- Social Links -->
                        <div class="bg-gray-800 p-4 rounded-lg border accent-border">
                            <h3 class="text-xl accent mb-4">Social Links</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="linkedin" class="block mb-2">LinkedIn</label>
                                    <input type="url" id="linkedin" name="linkedin" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="https://linkedin.com/in/...">
                                </div>
                                <div>
                                    <label for="github" class="block mb-2">GitHub</label>
                                    <input type="url" id="github" name="github" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md" placeholder="https://github.com/...">
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="button" id="createPortfolio" class="accent-bg px-8 py-3 rounded-md text-lg">
                                Create Portfolio
                            </button>
                            <button type="button" id="savePortfolio" class="bg-gray-700 px-8 py-3 rounded-md text-lg ml-4">
                                Save to Device
                            </button>
                            <button type="button" id="clearForm" class="bg-red-500 px-8 py-3 rounded-md text-lg ml-4">
                                Clear Form
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>

        <!-- Portfolio Preview -->
        <div id="portfolioPreview" style="display: none;">
            <!-- Navigation -->
            <nav class="bg-gray-900 border-b border-[#8758FF] shadow-md no-print">
                <div class="container mx-auto px-4 py-3 flex justify-between items-center">
                    <span class="text-xl font-semibold">Your Portfolio</span>
                    <div class="flex space-x-4">
                        <a id="backToForm" href="#" class="accent">
                            Edit Portfolio
                        </a>
                        <a href="#" onclick="window.print();" class="accent">
                            Print/Save PDF
                        </a>
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <header class="accent-bg py-16">
                <div class="container mx-auto px-4 text-center">
                    <h1 id="preview-name" class="text-4xl font-bold mb-2">Your Name</h1>
                    <p id="preview-profession" class="text-xl mb-6">Your Profession</p>
                    <div id="preview-contact" class="flex justify-center space-x-4">
                        <!-- Contact and social links added by JS -->
                    </div>
                </div>
            </header>

            <main class="container mx-auto px-4 py-8">
                <!-- About Section -->
                <section class="mb-12">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6">
                        <h2 class="text-2xl font-bold accent border-b-2 accent-border pb-2 mb-4">About Me</h2>
                        <p id="preview-about" class="text-gray-300">Your bio will appear here.</p>
                        
                        <div id="preview-location-container" class="mt-4 text-gray-400" style="display: none;">
                            <span id="preview-location"></span>
                        </div>
                    </div>
                </section>
                
                <!-- Skills Section -->
                <section id="preview-skills-section" class="mb-12" style="display: none;">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6">
                        <h2 class="text-2xl font-bold accent border-b-2 accent-border pb-2 mb-4">Skills</h2>
                        <div id="preview-skills" class="flex flex-wrap gap-2">
                            <!-- Skills added by JS -->
                        </div>
                    </div>
                </section>
                
                <!-- Experience Section -->
                <section id="preview-experience-section" class="mb-12" style="display: none;">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6">
                        <h2 class="text-2xl font-bold accent border-b-2 accent-border pb-2 mb-4">Experience</h2>
                        <div id="preview-experience">
                            <!-- Experience items added by JS -->
                        </div>
                    </div>
                </section>
                
                <!-- Projects Section -->
                <section id="preview-projects-section" class="mb-12" style="display: none;">
                    <div class="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6">
                        <h2 class="text-2xl font-bold accent border-b-2 accent-border pb-2 mb-4">Projects</h2>
                        <div id="preview-projects" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Projects added by JS -->
                        </div>
                    </div>
                </section>
            </main>
            
            <!-- Edit Button -->
            <a href="#" id="backToFormFloat" class="back-to-form no-print">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 mt-auto no-print">
        <div class="container mx-auto px-4 py-6">
            <div class="text-center">
                <p class="text-gray-400">&copy; <?php echo date('Y'); ?> FolioForge. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- link javascript file -->
    <script src="validation.js"></script>
</body>
</html>