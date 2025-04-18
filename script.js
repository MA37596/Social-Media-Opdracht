// Data voor random posts
const usernames = [
    "John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Alex Brown",
    "Emma Davis", "Chris Taylor", "Lisa Anderson", "David Miller", "Anna White"
];

const avatars = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg"
];

const contents = [
    "Just finished my morning run! 🏃‍♂️ #fitness #morningroutine",
    "Beautiful sunset at the beach today 🌅",
    "Check out my new video tutorial on JavaScript!",
    "Had an amazing time at the concert last night! 🎵",
    "Just published my latest article about web development",
    "Weekend getaway with friends! 🏖️",
    "New project coming soon! Stay tuned...",
    "Learning new things every day! 💻",
    "Morning coffee and coding ☕",
    "Beautiful day for a hike! 🏞️"
];

// Random post genereren
function generateRandomPost() {
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const randomContent = contents[Math.floor(Math.random() * contents.length)];
    const randomHoursAgo = Math.floor(Math.random() * 24);
    const randomDaysAgo = Math.floor(Math.random() * 7);
    
    const timestamp = randomDaysAgo > 0
        ? `${randomDaysAgo} day${randomDaysAgo > 1 ? 's' : ''} ago`
        : `${randomHoursAgo} hour${randomHoursAgo !== 1 ? 's' : ''} ago`;

    const hasImage = Math.random() > 0.3;
    const hasVideo = !hasImage && Math.random() > 0.7;

    return {
        id: Date.now() + Math.random(),
        username: randomUsername,
        avatar: randomAvatar,
        content: randomContent,
        image: hasImage ? `https://picsum.photos/800/600?random=${Math.random()}` : null,
        video: hasVideo ? "https://www.youtube.com/embed/dQw4w9WgXcQ" : null,
        timestamp: timestamp
    };
}

// Post element maken
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar}" alt="${post.username}" class="user-avatar">
            <div class="user-info">
                <a href="#" class="username">${post.username}</a>
                <div class="post-time">${post.timestamp}</div>
            </div>
        </div>
        <div class="post-content">
            <p class="post-text">${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            ${post.video ? `<iframe class="post-video" src="${post.video}" frameborder="0" allowfullscreen></iframe>` : ''}
        </div>
    `;
    return postElement;
}

let isLoading = false;
let currentPage = 1;

function loadMorePosts() {
    if (isLoading) {
        console.log('Already loading posts...');
        return;
    }
    
    console.log('Loading more posts...');
    isLoading = true;
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.add('active');

    setTimeout(() => {
        const feed = document.getElementById('feed');
        for (let i = 0; i < 5; i++) {
            const post = generateRandomPost();
            const postElement = createPostElement(post);
            feed.appendChild(postElement);
        }
        
        loadingElement.classList.remove('active');
        isLoading = false;
        currentPage++;
        console.log('Posts loaded successfully, current page:', currentPage);
        
        const newLoadingElement = document.createElement('div');
        newLoadingElement.id = 'loading';
        newLoadingElement.className = 'loading';
        newLoadingElement.textContent = 'Loading more posts...';
        feed.appendChild(newLoadingElement);
        
        observer.observe(newLoadingElement);
    }, 1000);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log('Intersection Observer triggered:', entry.isIntersecting);
        if (entry.isIntersecting && !isLoading) {
            console.log('Loading new posts...');
            observer.unobserve(entry.target);
            loadMorePosts();
        }
    });
}, {
    root: null,
    rootMargin: '100px',
    threshold: 0
});

const loadingElement = document.getElementById('loading');
if (loadingElement) {
    observer.observe(loadingElement);
    console.log('Started observing loading element');
} else {
    console.error('Loading element not found!');
}

loadMorePosts();
