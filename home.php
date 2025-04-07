<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FolioForge - Create Your Portfolio</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        body { background-color: #181818; color: white; }
        .accent { color: #8758FF; }
        .accent-bg { background-color: #8758FF; }
        .accent-border { border-color: #8758FF; }
        
        .theme-card {
            transition: all 0.3s ease;
        }
        
        .theme-card:hover {
            transform: translateY(-10px);
        }
        
        .theme-preview {
            height: 200px;
            background-size: cover;
            background-position: center;
        }
        
        .creative-theme { background-image: url('https://placehold.co/600x400/8758FF/FFFFFF/png?text=Creative'); }
        .minimalist-theme { background-image: url('https://placehold.co/600x400/2A2A2A/FFFFFF/png?text=Minimalist'); }
        .professional-theme { background-image: url('https://placehold.co/600x400/444444/FFFFFF/png?text=Professional'); }
        .modern-theme { background-image: url('https://placehold.co/600x400/6B4EE6/FFFFFF/png?text=Modern'); }
    </style>
</head>
<body class="min-h-screen flex flex-col">
    <!-- Header -->
    <nav class="bg-gray-900 border-b border-[#8758FF] shadow-md">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <a href="home.php" class="flex items-center">
                    <span class="text-xl font-bold">Folio<span class="accent">Forge</span></span>
                </a>
                <div>
                    <a href="index.php" class="text-gray-300 hover:text-white">Create Portfolio</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="py-20 text-center">
        <div class="container mx-auto px-4">
            <h1 class="text-5xl font-bold mb-6">Create Your Professional Portfolio</h1>
            <p class="text-xl text-gray-400 mb-8">Choose a theme that matches your style and create a stunning portfolio in minutes</p>
            <div class="flex justify-center space-x-4">
                <a href="#themes" class="accent-bg px-8 py-3 rounded-md text-lg hover:bg-[#6a3fcf] transition-colors">
                    Get Started
                </a>
                <a href="#features" class="bg-gray-800 px-8 py-3 rounded-md text-lg hover:bg-gray-700 transition-colors">
                    Learn More
                </a>
            </div>
        </div>
    </header>

    <!-- Features Section -->
    <section id="features" class="py-16 bg-gray-900">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Why Choose FolioForge?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-gray-800 p-6 rounded-lg">
                    <div class="text-4xl mb-4 accent">🎨</div>
                    <h3 class="text-xl font-semibold mb-2">Beautiful Themes</h3>
                    <p class="text-gray-400">Choose from our carefully crafted themes to make your portfolio stand out</p>
                </div>
                <div class="bg-gray-800 p-6 rounded-lg">
                    <div class="text-4xl mb-4 accent">⚡</div>
                    <h3 class="text-xl font-semibold mb-2">Quick Setup</h3>
                    <p class="text-gray-400">Create your portfolio in minutes with our intuitive interface</p>
                </div>
                <div class="bg-gray-800 p-6 rounded-lg">
                    <div class="text-4xl mb-4 accent">📱</div>
                    <h3 class="text-xl font-semibold mb-2">Responsive Design</h3>
                    <p class="text-gray-400">Your portfolio will look great on all devices</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Themes Section -->
    <section id="themes" class="py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Choose Your Theme</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Creative Theme -->
                <div class="theme-card bg-gray-800 rounded-lg overflow-hidden">
                    <div class="theme-preview creative-theme"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">Creative</h3>
                        <p class="text-gray-400 mb-4">Perfect for artists and designers</p>
                        <a href="index.php?theme=creative" class="accent-bg px-6 py-2 rounded-md inline-block hover:bg-[#6a3fcf] transition-colors">
                            Select Theme
                        </a>
                    </div>
                </div>

                <!-- Minimalist Theme -->
                <div class="theme-card bg-gray-800 rounded-lg overflow-hidden">
                    <div class="theme-preview minimalist-theme"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">Minimalist</h3>
                        <p class="text-gray-400 mb-4">Clean and simple design</p>
                        <a href="index.php?theme=minimalist" class="accent-bg px-6 py-2 rounded-md inline-block hover:bg-[#6a3fcf] transition-colors">
                            Select Theme
                        </a>
                    </div>
                </div>

                <!-- Professional Theme -->
                <div class="theme-card bg-gray-800 rounded-lg overflow-hidden">
                    <div class="theme-preview professional-theme"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">Professional</h3>
                        <p class="text-gray-400 mb-4">Ideal for business professionals</p>
                        <a href="index.php?theme=professional" class="accent-bg px-6 py-2 rounded-md inline-block hover:bg-[#6a3fcf] transition-colors">
                            Select Theme
                        </a>
                    </div>
                </div>

                <!-- Modern Theme -->
                <div class="theme-card bg-gray-800 rounded-lg overflow-hidden">
                    <div class="theme-preview modern-theme"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">Modern</h3>
                        <p class="text-gray-400 mb-4">Contemporary and dynamic</p>
                        <a href="index.php?theme=modern" class="accent-bg px-6 py-2 rounded-md inline-block hover:bg-[#6a3fcf] transition-colors">
                            Select Theme
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 mt-auto">
        <div class="container mx-auto px-4 py-6">
            <div class="text-center">
                <p class="text-gray-400">&copy; <?php echo date('Y'); ?> FolioForge. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html> 