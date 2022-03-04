/* global token */

export const generate_pdf = async (term_code) => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/courses/' + term_code + '/pdf', {
            credentials: 'include',
            method: 'GET',
            headers: {
                Accept: 'application/pdf',
                Authorization: 'Bearer ' + token,
            },
        })

        await response.body
            .getReader()
            .read()
            .then((data) => {
                const blob = new Blob([data.value], { type: 'application/pdf' })
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'course-list.pdf'
                link.click()
            })
    } catch (err) {
        return err
    }
}
