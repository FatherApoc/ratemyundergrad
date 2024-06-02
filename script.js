document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('university-form');
    const resultsDiv = document.getElementById('results');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const universityName = document.getElementById('university-name').value;
        resultsDiv.innerHTML = '';

        try {
            const response = await fetch(`/api/university?name=${encodeURIComponent(universityName)}`);
            const data = await response.json();

            if (data.error) {
                resultsDiv.innerHTML = `<p>${data.error}</p>`;
            } else {
                displayResults(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = '<p>Error fetching data</p>';
        }
    });

    function displayResults(university) {
        const prosConsTable = `
            <table>
                <thead>
                    <tr>
                        <th>Pros</th>
                        <th>Cons</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${university.pros.join('<br>')}</td>
                        <td>${university.cons.join('<br>')}</td>
                    </tr>
                </tbody>
            </table>
        `;

        resultsDiv.innerHTML = prosConsTable;
    }
});
