
    
        // Tailwind script init
        function initializeTailwind() {
            tailwind.config = {
                content: [],
                theme: {
                    extend: {}
                }
            }
        }

        // Hero Slideshow Data
        const heroImages = [
            "./photo/12.jpg",
            "./photo/16.jpg",
            "./photo/20.jpg",
            "./photo/9.jpg",
            "./photo/3.jpg",
            "./photo/7.jpg",
            "./photo/21.jpg",
            "./photo/1.jpg",

        ]
        
        let currentSlide = 0
        
        function createHeroSlides() {
            const container = document.getElementById('hero-slides')
            heroImages.forEach((url, i) => {
                const div = document.createElement('div')
                div.className = `hero-bg absolute inset-0 ${i === 0 ? 'opacity-100' : 'opacity-0'}`
                div.style.backgroundImage = `url('${url}')`
                container.appendChild(div)
            })
            setInterval(changeHeroSlide, 5000)
        }
        
        function changeHeroSlide() {
            const slides = document.querySelectorAll('#hero-slides > div')
            slides[currentSlide].classList.remove('opacity-100')
            slides[currentSlide].classList.add('opacity-0')
            
            currentSlide = (currentSlide + 1) % slides.length
            
            slides[currentSlide].classList.remove('opacity-0')
            slides[currentSlide].classList.add('opacity-100')
        }

        // Portfolio Data
        let portfolioItems = [
            {
                id: 1,
                image: "./photo/12.jpg",
                name: "Sarah & Daniel",
                desc: "Romantic garden wedding with floating lanterns",
                category: "wedding"
            },
            {
                id: 2,
                image: "./photo/9.jpg",
                name: "Lily’s 5th Birthday",
                desc: "Whimsical unicorn wonderland",
                category: "birthday"
            },
            {
                id: 3,
                image: "./photo/8.jpg",
                name: "EthioBank Gala",
                desc: "Corporate elegance with gold & emerald",
                category: "corporate"
            },
            {
                id: 4,
                image: "./photo/7.jpg",
                name: "Abebe & Selam Engagement",
                desc: "Intimate rooftop proposal setup",
                category: "special"
            },
            {
                id: 5,
                image: "./photo/18.jpg",
                name: "Michael & Sophia",
                desc: "Modern minimalist wedding",
                category: "wedding"
            },
             {
                id: 6,
                image: "./photo/22.jpg",
                name: "Michael & Sophia",
                desc: "Modern minimalist wedding",
                category: "wedding"
            },
             {
                id: 7,
                image: "./photo/20.jpg",
                name: "Michael & Sophia",
                desc: "Modern minimalist wedding",
                category: "wedding"
            },
             {
                id: 8,
                image: "./photo/17.jpg",
                name: "Michael & Sophia",
                desc: "Modern minimalist wedding",
                category: "wedding"
            },
             {
                id: 9,
                image: "./photo/4.jpg",
                name: "Michael & Sophia",
                desc: "Modern minimalist wedding",
                category: "wedding"
            },   {
                id: 10,
                image: "./photo/1.jpg",
                name: "Michael & Sophia",
                desc: "Modern minimalist wedding",
                category: "wedding"
            },
             {
                id: 11,
                image: "./photo/2.jpg",
                name: "Michael & Sophia",
                desc: "Modern minimalist wedding",
                category: "wedding"
            },
             {
                id: 12,
                image: "./photo/3.jpg",
                name: "Michael & Sophia",
                desc: "Modern minimalist wedding",
                category: "wedding"
            },
        ]
        
        let filteredItems = [...portfolioItems]
        
        function renderGallery() {
            const container = document.getElementById('gallery-grid')
            container.innerHTML = ''
            
            filteredItems.forEach(item => {
                const card = document.createElement('div')
                card.className = 'group relative overflow-hidden rounded-3xl cursor-pointer'
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" 
                         class="gallery-img w-full aspect-[4/5] object-cover">
                    <div class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                        <div>
                            <div class="text-sm uppercase tracking-widest text-[#d4af77]">${item.category}</div>
                            <div class="font-medium text-xl">${item.name}</div>
                            <div class="text-white/70 text-sm">${item.desc}</div>
                        </div>
                    </div>
                `
                card.onclick = () => openLightbox(item.image, `${item.name} — ${item.desc}`)
                container.appendChild(card)
            })
        }
        
        function filterGallery(category) {
            // Remove active class from all
            document.querySelectorAll('#category-filters button').forEach(btn => {
                btn.classList.remove('bg-[#d4af77]', 'text-black', 'border-[#d4af77]')
                if ((category === 'all' && btn.textContent === 'All') || 
                    btn.textContent.toLowerCase() === category) {
                    btn.classList.add('bg-[#d4af77]', 'text-black', 'border-[#d4af77]')
                }
            })
            
            if (category === 'all') {
                filteredItems = [...portfolioItems]
            } else {
                filteredItems = portfolioItems.filter(item => item.category === category)
            }
            renderGallery()
        }

        // Upload new work
        function uploadNewWork() {
            const fileInput = document.getElementById('photo-upload')
            const name = document.getElementById('event-name').value || "New Project"
            const category = document.getElementById('event-category').value
            const desc = document.getElementById('event-desc').value || "Beautiful new decoration"
            
            if (!fileInput.files[0]) {
                alert("Please select a photo first ✨")
                return
            }
            
            const reader = new FileReader()
            reader.onload = function(e) {
                const newItem = {
                    id: Date.now(),
                    image: e.target.result,
                    name: name,
                    desc: desc,
                    category: category
                }
                portfolioItems.unshift(newItem)
                filteredItems = [...portfolioItems]
                renderGallery()
                
                // Reset form
                document.getElementById('upload-form').reset()
                alert("✅ Work published to gallery!")
            }
            reader.readAsDataURL(fileInput.files[0])
        }

        // Lightbox
        function openLightbox(src, caption) {
            const lb = document.getElementById('lightbox')
            const img = document.getElementById('lightbox-image')
            const cap = document.getElementById('lightbox-caption')
            
            img.src = src
            cap.textContent = caption
            lb.classList.remove('hidden')
            lb.classList.add('flex')
            document.body.style.overflow = 'hidden'
        }
        
        function closeLightbox() {
            const lb = document.getElementById('lightbox')
            lb.classList.add('hidden')
            lb.classList.remove('flex')
            document.body.style.overflow = 'visible'
        }

        // Latest Works Slider
        let latestIndex = 0
        
        function renderLatestSlider() {
            const container = document.getElementById('latest-slider')
            container.innerHTML = ''
            
            // Duplicate some for infinite feel
            const displayItems = [...portfolioItems, ...portfolioItems.slice(0, 3)]
            
            displayItems.forEach(item => {
                const slide = document.createElement('div')
                slide.className = 'min-w-[320px] bg-zinc-900 rounded-3xl overflow-hidden flex-shrink-0'
                slide.innerHTML = `
                    <img src="${item.image}" class="w-full h-96 object-cover">
                    <div class="p-6">
                        <div class="text-[#d4af77] text-xs">${item.category.toUpperCase()}</div>
                        <div class="font-medium text-xl mt-1">${item.name}</div>
                    </div>
                `
                container.appendChild(slide)
            })
        }
        
        function nextSlide() {
            const slider = document.getElementById('latest-slider')
            latestIndex++
            slider.style.transition = 'transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)'
            slider.style.transform = `translateX(-${latestIndex * 340}px)`
            
            // Loop
            if (latestIndex > portfolioItems.length) {
                setTimeout(() => {
                    slider.style.transition = 'none'
                    latestIndex = 0
                    slider.style.transform = `translateX(0)`
                }, 600)
            }
        }
        
        function prevSlide() {
            const slider = document.getElementById('latest-slider')
            latestIndex--
            if (latestIndex < 0) latestIndex = 0
            slider.style.transform = `translateX(-${latestIndex * 340}px)`
        }

        // Testimonials Data
        const testimonials = [
            {
                quote: "ኤሌና ዲኮር የሠርጋችንን ቀን ፍጹም አድርጎታል። እያንዳንዱ እንግዳ ንግግር አጥቷል!",
                name: "Selam Tekle",
                role: "Bride • 2025"
            },
            {
                quote: "The corporate launch we hosted looked like it came straight from a luxury magazine.",
                name: "Abebe Kifle",
                role: "EthioTech"
            },
            {
                quote: "My daughter still talks about her unicorn birthday party. Thank you for the memories!",
                name: "Mekdes Assefa",
                role: "Mother of Lily"
            }
        ]
        
        function renderTestimonials() {
            const container = document.getElementById('testimonial-slider')
            container.innerHTML = `
                <div class="bg-zinc-100 rounded-3xl p-12 max-w-3xl mx-auto">
                    <div id="current-testimonial" class="text-center">
                        <div class="text-7xl text-[#d4af77]/20 mb-6">“</div>
                        <p class="text-2xl font-light leading-relaxed text-zinc-700" id="quote-text">${testimonials[0].quote}</p>
                        <div class="mt-12">
                            <div class="font-semibold" id="quote-name">${testimonials[0].name}</div>
                            <div class="text-sm text-zinc-500" id="quote-role">${testimonials[0].role}</div>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-center gap-6 mt-10">
                    <button onclick="prevTestimonial()" class="text-2xl text-zinc-300 hover:text-zinc-600">←</button>
                    <button onclick="nextTestimonial()" class="text-2xl text-zinc-300 hover:text-zinc-600">→</button>
                </div>
            `
        }
        
        let currentTestimonialIndex = 0
        
        function showTestimonial(index) {
            currentTestimonialIndex = index
            const quote = document.getElementById('quote-text')
            const name = document.getElementById('quote-name')
            const role = document.getElementById('quote-role')
            
            quote.style.opacity = 0
            setTimeout(() => {
                quote.textContent = testimonials[index].quote
                name.textContent = testimonials[index].name
                role.textContent = testimonials[index].role
                quote.style.opacity = 1
            }, 300)
        }
        
        function nextTestimonial() {
            let next = currentTestimonialIndex + 1
            if (next >= testimonials.length) next = 0
            showTestimonial(next)
        }
        
        function prevTestimonial() {
            let prev = currentTestimonialIndex - 1
            if (prev < 0) prev = testimonials.length - 1
            showTestimonial(prev)
        }

        // Video Modal
        function playVideo() {
            document.getElementById('video-modal').classList.remove('hidden')
            document.getElementById('video-modal').classList.add('flex')
        }
        
        function closeVideo() {
            const modal = document.getElementById('video-modal')
            modal.classList.add('hidden')
            modal.classList.remove('flex')
        }

        // Contact form handler
        function handleContact(e) {
            e.preventDefault()
            alert("✨ Thank you! Elena will reply within 2 hours.")
            e.target.reset()
        }

        // Mobile menu
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu')
            menu.classList.toggle('hidden')
        }

        // Keyboard escape for modals
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape") {
                const lb = document.getElementById('lightbox')
                const vm = document.getElementById('video-modal')
                if (!lb.classList.contains('hidden')) closeLightbox()
                else if (!vm.classList.contains('hidden')) closeVideo()
            }
        })

        // Initialize everything
        function initializeWebsite() {
            initializeTailwind()
            createHeroSlides()
            renderGallery()
            renderLatestSlider()
            renderTestimonials()
            
            // Auto advance latest slider every 4s
            setInterval(() => {
                nextSlide()
            }, 4000)
            
            // Make filters active on load
            const allBtn = document.querySelector('#category-filters button')
            allBtn.classList.add('bg-[#d4af77]', 'text-black', 'border-[#d4af77]')
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault()
                        const target = document.querySelector(this.getAttribute('href'))
                        if (target) target.scrollIntoView({ behavior: 'smooth' })
                    }
                })
            })
            
            console.log('%c✅ Elena Decor website ready. Luxury at your fingertips.', 'color:#d4af77; font-family:monospace')
        }
        
        // Boot the site
        window.onload = initializeWebsite
    