
document.addEventListener('DOMContentLoaded', function () {
    const studentTableBody = document.getElementById('studentTableBody');
    const studentModal = document.getElementById('studentModal');
    const deleteConfirm = document.getElementById('deleteConfirm');
    const closeModal = document.getElementById('closeModal');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const studentForm = document.getElementById('studentForm');
    const modalTitle = document.getElementById('modalTitle');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    let editIndex = null;

    // Open the modal for adding a new student
    addStudentBtn.addEventListener('click', function () {
        modalTitle.textContent = 'Tambah Mahasiswa';
        studentForm.reset();
        studentModal.style.display = 'flex';
        editIndex = null;
    });

    // Close the modal
    closeModal.addEventListener('click', function () {
        studentModal.style.display = 'none';
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === studentModal || event.target === deleteConfirm) {
            studentModal.style.display = 'none';
            deleteConfirm.style.display = 'none';
        }
    });

    // Save or update a student
    studentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('studentName').value;
        const nim = document.getElementById('studentNIM').value;

        if (editIndex === null) {
            // Adding a new student
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${studentTableBody.children.length + 1}</td>
                <td>${name}</td>
                <td>${nim}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Hapus</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        } else {
            // Updating an existing student
            const row = studentTableBody.children[editIndex];
            row.children[1].textContent = name;
            row.children[2].textContent = nim;
        }

        // Hide the modal after saving
        studentModal.style.display = 'none';
    });

    // Handle edit and delete button clicks on the table rows
    studentTableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn')) {
            // Editing a student
            const row = event.target.parentElement.parentElement;
            editIndex = Array.from(studentTableBody.children).indexOf(row);
            document.getElementById('studentName').value = row.children[1].textContent;
            document.getElementById('studentNIM').value = row.children[2].textContent;
            modalTitle.textContent = 'Edit Mahasiswa';
            studentModal.style.display = 'flex';
        }

        if (event.target.classList.contains('delete-btn')) {
            // Deleting a student
            const row = event.target.parentElement.parentElement;
            editIndex = Array.from(studentTableBody.children).indexOf(row);
            deleteConfirm.style.display = 'flex';
        }
    });

    // Confirm the deletion of a student
    confirmDeleteBtn.addEventListener('click', function () {
        if (editIndex !== null) {
            studentTableBody.children[editIndex].remove();
            // Reindex the numbers after deletion
            Array.from(studentTableBody.children).forEach((row, index) => {
                row.children[0].textContent = index + 1;
            });
            deleteConfirm.style.display = 'none';
        }
    });

    // Cancel deletion
    cancelDeleteBtn.addEventListener('click', function () {
        deleteConfirm.style.display = 'none';
    });
});
