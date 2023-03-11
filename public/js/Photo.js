let image_upload;

(function() {
    const main = document.querySelector('main');

    main.querySelector(".box_img #input_box_img").addEventListener("change", async (e) => {
        const src = URL.createObjectURL(e.target.files[0])
        image_upload = src
    })

})()