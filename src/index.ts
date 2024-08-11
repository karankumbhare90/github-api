// const getUser = document.querySelector('#user') as HTMLInputElement;
// const form = document.querySelector('#form') as HTMLFormElement;
// const main_container = document.querySelector('.main-container') as HTMLElement;


// interface UserData {
//     id: number;
//     login: String;
//     avatar_url: string;
//     location: String;
//     html_url: String;
// }

// // reusable function
// const customFunction = async <T>(url: string, obj?: RequestInit): Promise<T> => {
//     const response = await fetch(url, obj);

//     if (!response.ok) {
//         throw new Error(`Network response was not ok - status : ${response.status}`)
//     }

//     const data = await response.json();
//     console.log(data);
//     return data;
// }

// // Card of User Profile
// const showResultUI = (singleUser: UserData) => {

//     const { avatar_url, login, html_url, location } = singleUser;

//     const htmlString = `
//     <div class="card">
//         <div class="card-image">
//             <img src="${avatar_url}" class="avatar" alt="${login}" />
//         </div>
//         <div class="card-footer">
//             <div class="user-data">
//                 <img src="${avatar_url}"  alt="${login}" />
//                 <p>${login}</p>
//             </div>
//             <a href="${html_url}" taget="_blank">GitHub</a>
//         </div>
//         </div>
//     `;

//     main_container.insertAdjacentHTML("beforeend", htmlString);
// }

// const fetchUserDetails = (url: string) => {
//     customFunction<UserData[]>(url, {}).then((data) => {
//         data?.map((item) => {
//             showResultUI(item);
//         })
//     });
// }

// // default function call
// fetchUserDetails('https://api.github.com/users');

// // Search User

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const searchTerm = getUser.value.toLowerCase();

//     try {
//         const url = `https://api.github.com/users`;
//         const allUrserInfo = await customFunction<UserData[]>(url, {});

//         const match = allUrserInfo.filter((user) => {
//             return user.login.toLowerCase().includes(searchTerm);
//         })

//         main_container.innerHTML = "";

//         if (match.length === 0) {
//             const alertString = `<p class="empty-msg">No Matching users found</p>`
//             main_container.insertAdjacentHTML("beforeend", alertString);
//         }
//         else {
//             match.map((user) => {
//                 showResultUI(user);
//             })
//         }
//     } catch (error) {

//     }
// })

const getUser = document.querySelector('#user') as HTMLInputElement;
const form = document.querySelector('#form') as HTMLFormElement;
const main_container = document.querySelector('.main-container') as HTMLElement;

interface UserData {
    id: number;
    login: string;
    avatar_url: string;
    location: string;
    html_url: string;
}

// Reusable function to fetch data
const customFunction = async <T>(url: string, obj?: RequestInit): Promise<T> => {
    const response = await fetch(url, obj);
    if (!response.ok) {
        throw new Error(`Network response was not ok - status : ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Card of User Profile
const showResultUI = (singleUser: UserData) => {
    const { avatar_url, login, html_url, location } = singleUser;
    const htmlString = `
    <div class="card">
        <div class="card-image">
            <img src="${avatar_url}" class="avatar" alt="${login}" />
        </div>
        <div class="card-footer">
            <div class="user-data">
                <p>@${login}</p>
                <p class="location">${location || ''}</p>
            </div>
            <a href="${html_url}" target="_blank"><button><i class="fa-brands fa-github"></i></button></a>
        </div>
    </div>
    `;
    main_container.insertAdjacentHTML("beforeend", htmlString);
}

// Fetch and display users
const fetchUsers = async (url: string) => {
    try {
        main_container.innerHTML = ''; // Clear any existing content
        const users = await customFunction<UserData[]>(url);
        users.forEach(user => {
            showResultUI(user); // Display user data
            console.log(user)
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        main_container.innerHTML = `<p class="empty-msg">Error loading users</p>`;
    }
}

// Fetch and display user details by username
const fetchUserDetails = async (username: string) => {
    try {
        const url = `https://api.github.com/users/${username}`;
        const user = await customFunction<UserData>(url);
        main_container.innerHTML = ""; // Clear existing content
        showResultUI(user); // Display user data
    } catch (error) {
        console.error('Error fetching user details:', error);
        main_container.innerHTML = `<p class="empty-msg">User not found</p>`;
    }
}

// Form submission event handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = getUser.value.trim().toLowerCase();
    if (searchTerm) {
        await fetchUserDetails(searchTerm);
    } else {
        main_container.innerHTML = `<p class="empty-msg">Please enter a username</p>`;
    }
})

// Initial call to fetch and display users
fetchUsers('https://api.github.com/users');
