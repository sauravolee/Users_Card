const usersList = document.getElementById('usersList');
const searchBar = document.getElementById('searchBar');
let userLst = {};

searchBar.addEventListener('keyup',(e) =>{
    const searchString = e.target.value.toLowerCase();
    const filterdUsers = userLst.filter((character) =>{
        return character.email.includes(searchString);
        // console.log("filterdUsers");
    });
    displayUsers(filterdUsers);
});

const loadUsers =  async () => {
    try {
        const res = await fetch('https://reqres.in/api/users?page=1');
        userLst = (await res.json()).data;
        displayUsers(userLst);
        // console.log(userLst);
    } catch(err){
        console.log(err);
    }
};

const displayUsers = (users) => {
    const htmlString = users
        .map((data) => {
            return `
            <div class="col-md-3 col-sm-6 col-xs-12">
                <section class="section">
                    <li class = "user">
                        <img src="${data.avatar}"></img>
                        <h2>ID: ${data.id}</h2>
                        <h3>${data.first_name} ${data.last_name}</h3>
                        <p>${data.email}</p>
                    </li>
                </section>
            </div>
        `
        })
        .join('');
    usersList.innerHTML = htmlString;
}

loadUsers();