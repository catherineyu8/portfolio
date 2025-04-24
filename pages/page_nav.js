var navbar = ` 
    <nav>
        <a href="../index.html">home</a>
        <a href="about.html">about</a>
        <a href="projects.html">projects</a>
        <a href="contact.html">contact</a>
    </nav>`;

// inserting navbar in beginning of body
document.body.insertAdjacentHTML("afterbegin", navbar); // TODO: fix the alignment of this
