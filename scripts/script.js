// onload handler
onload = () => {
  loadAllPosts();
  loadLatestPost();
}

// loading all posts
function loadAllPosts() {
  fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    .then(res => res.json())
    .then(data => displayAllPosts(data.posts));
}

// displaying all posts 
function displayAllPosts(posts) {
  const allPostsContainer = document.getElementById('all-posts-container');
  allPostsContainer.innerHTML = '';
  posts.forEach(post => {
    // create card
    const postCard = document.createElement('div');
    postCard.classList = 'p-4 md:p-10 bg-[#F3F3F5] rounded-3xl flex flex-col md:flex-row gap-6 border border-[#F3F3F5] hover:border hover:border-secondary-color hover:bg-[#797dfc1a] transition-all';
    postCard.innerHTML = `
    <div>
      <div class="w-24 relative">
        <div class="size-[18px] rounded-full bg-[${post.isActive ? '#10B981' : '#FF3434'}] absolute -top-1 -right-1 border-2 border-white"></div>
        <img class="rounded-2xl" src="${post.image}" />
      </div>
    </div>
    <div class="font-inter flex-1">
      <div class="flex gap-5 text-sm font-semibold opacity-80 mb-3">
        <span># ${post.category}</span>
        <p>Author : ${post.author.name}</p>
      </div>
      <h3 class="font-bold font-mulish text-xl">${post.title}</h3>
      <p class="opacity-60 mt-4">${post.description}</p>
      <div class="border-t border-dashed border-primary-color opacity-25 my-5"></div>
      <div class="flex justify-between items-center">
        <div class="flex gap-4 md:gap-6">
          <div class="flex gap-2 md:gap-4 items-center">
            <img src="./assets/icons/message.svg" alt="">
            <span class="opacity-60">${post.comment_count}</span>
          </div>
          <div class="flex gap-2 md:gap-4 items-center">
            <img src="./assets/icons/eye.svg" alt="">
            <span class="opacity-60">${post.view_count}</span>
          </div>
          <div class="flex gap-2 md:gap-4 items-center">
            <img src="./assets/icons/clock.svg" alt="">
            <span class="opacity-60">${post.posted_time} min</span>
          </div>
        </div>
        <div onclick="handleMarkAsRead(&quot;${post.title}&quot;, ${post.view_count})" class="cursor-pointer">
          <img src="./assets/icons/envelope.svg" alt="">
        </div>
      </div>
    </div>
    `;

    // append card to the card container
    allPostsContainer.appendChild(postCard);
  });
}

// loading latest posts
function loadLatestPost() {
  fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    .then(res => res.json())
    .then(data => displayLatestPosts(data));
}

// displaying latest posts
function displayLatestPosts(posts) {
  const latestPostContainer = document.getElementById('latest-post-container');
  posts.forEach(post => {
    // create card
    const postCard = document.createElement('div');
    postCard.classList = 'card p-6 border border-[#12132d26]';
    postCard.innerHTML = `
    <figure>
      <img src="${post.cover_image}" alt="Shoes"
        class="rounded-2xl" />
    </figure>
    <div class="mt-6 flex flex-col flex-1">
      <div class="flex gap-3 items-center">
        <img src="./assets/icons/calender.svg" alt="">
        <span class="opacity-60">${post.author.posted_date ?? 'No publish date'}</span>
      </div>
      <h2 class="card-title text-lg font-semibold my-3">${post.title}</h2>
      <p class="flex-1 opacity-60">${post.description}</p>
      <div class="flex items-center gap-4 mt-4">
        <img class="rounded-full size-11" src="${post.profile_image}">
        <div>
          <h4 class="font-bold">${post.author.name}</h4>
          <p class="text-sm opacity-60">${post.author.designation ?? 'Unknown'}</p>
        </div>
      </div>
    </div>
    `;

    // append card to the card container
    latestPostContainer.appendChild(postCard);
  })
}

// mark as read handler
function handleMarkAsRead(title, viewCount) {
  const markAsReadContainer = document.getElementById('mark-as-read-container');
  const markAsReadCount = document.getElementById('mark-as-read-count');

  // create item
  const readItem = document.createElement('div');
  readItem.classList = 'bg-white p-4 flex justify-between gap-1';
  readItem.innerHTML = `
  <h4 class="font-semibold flex-1">${title}</h4>
  <div class="flex items-center gap-3">
    <img src="./assets/icons/eye.svg" alt="">
    <span class="opacity-80">${viewCount}</span>
  </div>
  `;

  // add to the container
  markAsReadContainer.appendChild(readItem);

  // update mark as read count
  let readCount = parseInt(markAsReadCount.innerText);
  markAsReadCount.innerText = readCount + 1;
}

// search handler 
function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.toLowerCase();
  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.classList.remove('hidden');
  setTimeout(() => loadingSpinner.classList.add('hidden'), 2000);
  loadSearchPosts(searchText);
}

// loading searched posts
function loadSearchPosts(searchText) {
  fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    .then(res => res.json())
    .then(data => displayAllPosts(data.posts));
}