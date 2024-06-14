document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const colorInput = document.getElementById("color-input");
    const newColorInput = document.getElementById("new-color-input");
    const toleranceInput = document.getElementById("tolerance-input");
    const toneCheckbox = document.getElementById("tone-checkbox");
    const blendCheckbox = document.getElementById("blend-checkbox");
    const replaceBtn = document.getElementById("replace-btn");
    const originalCanvas = document.getElementById("original-canvas");
    const originalContext = originalCanvas.getContext('2d');
    const resultImageContainer = document.getElementById("result-image-container");
    const fileChosen = document.getElementById("file-chosen");
    const thicknessInput = document.getElementById("thickness-input");
    const thickness = parseInt(thicknessInput.value, 10);
    const swapViewToggle = document.getElementById("swap-view-toggle");


    let selectedColor = { r: 0, g: 0, b: 0 };

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            fileChosen.textContent = `File chosen: ${file.name}`;
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    originalCanvas.width = img.width;
                    originalCanvas.height = img.height;
                    originalContext.drawImage(img, 0, 0);
                    originalCanvas.style.display = 'block';
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            fileChosen.textContent = "No file chosen";
            originalCanvas.style.display = 'none';
        }
    });

    originalCanvas.addEventListener("click", function (event) {
        const rect = originalCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const pixel = originalContext.getImageData(x, y, 1, 1).data;
        selectedColor = { r: pixel[0], g: pixel[1], b: pixel[2] };
        colorInput.value = rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b);
    });

    replaceBtn.addEventListener("click", function () {
        const file = fileInput.files[0];
        const newColor = hexToRgb(newColorInput.value);
        const tolerance = parseInt(toleranceInput.value, 10);
        const maintainTones = toneCheckbox.checked;
        const blendEdges = blendCheckbox.checked;

        if (file && newColor) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    if (isColorWithinTolerance(data[i], data[i + 1], data[i + 2], selectedColor, tolerance)) {
                        if (maintainTones) {
                            const hsl = rgbToHsl(data[i], data[i + 1], data[i + 2]);
                            const newHsl = rgbToHsl(newColor.r, newColor.g, newColor.b);
                            const blendedHsl = { h: newHsl.h, s: hsl.s, l: hsl.l };
                            const blendedRgb = hslToRgb(blendedHsl.h, blendedHsl.s, blendedHsl.l);
                            data[i] = blendedRgb.r;
                            data[i + 1] = blendedRgb.g;
                            data[i + 2] = blendedRgb.b;
                        } else {
                            data[i] = newColor.r;
                            data[i + 1] = newColor.g;
                            data[i + 2] = newColor.b;
                        }
                    }
                }

                if (blendEdges) {
                    blendColorsAtEdges(data, img.width, img.height);
                }

                ctx.putImageData(imageData, 0, 0);

                const resultImg = new Image();
                resultImg.src = canvas.toDataURL();
                resultImageContainer.innerHTML = '';
                resultImageContainer.appendChild(resultImg);
            }
            img.src = URL.createObjectURL(file);
        } else {
            alert("Please choose a file and select a color.");
        }
    });

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    function isColorWithinTolerance(r, g, b, color, tolerance) {
        return (
            Math.abs(r - color.r) <= tolerance &&
            Math.abs(g - color.g) <= tolerance &&
            Math.abs(b - color.b) <= tolerance
        );
    }

    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h, s, l };
    }

    function hslToRgb(h, s, l) {
        let r, g, b;

        if (s == 0) {
            r = g = b = l;
        } else {
            const hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 3) return q;
                if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    function blendColorsAtEdges(data, width, height) {
        const alpha = 0.5; // Adjust this value to change the blending ratio
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const i = (y * width + x) * 4;
                const neighbors = [
                    ((y - 1) * width + (x - 1)) * 4,
                    ((y - 1) * width + x) * 4,
                    ((y - 1) * width + (x + 1)) * 4,
                    (y * width + (x - 1)) * 4,
                    (y * width + (x + 1)) * 4,
                    ((y + 1) * width + (x - 1)) * 4,
                    ((y + 1) * width + x) * 4,
                    ((y + 1) * width + (x + 1)) * 4,
                ];

                let blendedR = data[i], blendedG = data[i + 1], blendedB = data[i + 2];
                for (const n of neighbors) {
                    blendedR = (1 - alpha) * blendedR + alpha * data[n];
                    blendedG = (1 - alpha) * blendedG + alpha * data[n + 1];
                    blendedB = (1 - alpha) * blendedB + alpha * data[n + 2];
                }

                data[i] = blendedR;
                data[i + 1] = blendedG;
                data[i + 2] = blendedB;
            }
        }
    }

    function blendColorsAtEdges(data, width, height) {
        const alpha = 0.5; // Adjust this value to change the blending ratio
        const t = thickness;
        for (let y = t; y < height - t; y++) {
            for (let x = t; x < width - t; x++) {
                const i = (y * width + x) * 4;
                const neighbors = [
                    ((y - 1) * width + (x - 1)) * 4,
                    ((y - 1) * width + x) * 4,
                    ((y - 1) * width + (x + 1)) * 4,
                    (y * width + (x - 1)) * 4,
                    (y * width + (x + 1)) * 4,
                    ((y + 1) * width + (x - 1)) * 4,
                    ((y + 1) * width + x) * 4,
                    ((y + 1) * width + (x + 1)) * 4,
                ];

                let blendedR = data[i], blendedG = data[i + 1], blendedB = data[i + 2];
                for (const n of neighbors) {
                    blendedR = (1 - alpha) * blendedR + alpha * data[n];
                    blendedG = (1 - alpha) * blendedG + alpha * data[n + 1];
                    blendedB = (1 - alpha) * blendedB + alpha * data[n + 2];
                }

                data[i] = blendedR;
                data[i + 1] = blendedG;
                data[i + 2] = blendedB;
            }
        }
    }


    swapViewToggle.addEventListener("change", function () {
        renderImage();
    });

    const img = document.getElementById("image");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    swapViewToggle.addEventListener("change", renderImage);
    
    function renderImage() {
        const swapViewEnabled = swapViewToggle.checked;
        
        if (swapViewEnabled) {
            // Show color swap areas
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
    
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const alpha = pixels[i + 3];
    
                // Perform color swap area visualization
                // For example, change pixel color based on swap area condition
    
                // Example: Change pixels in color swap area to white
                if (r === 255 && g === 0 && b === 0) { // Assuming red is the color to swap
                    pixels[i] = 255; // Set red channel to maximum
                    pixels[i + 1] = 255; // Set green channel to maximum
                    pixels[i + 2] = 255; // Set blue channel to maximum
                }
            }
    
            ctx.putImageData(imageData, 0, 0);
            img.src = canvas.toDataURL();
        } else {
            // Show original image without color swap areas
            // Render the image normally
            img.src = "original_image.jpg"; // Replace "original_image.jpg" with the URL of your original image
        }
    }    
});
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const colorInput = document.getElementById("color-input");
    const newColorInput = document.getElementById("new-color-input");
    const toleranceInput = document.getElementById("tolerance-input");
    const toneCheckbox = document.getElementById("tone-checkbox");
    const blendCheckbox = document.getElementById("blend-checkbox");
    const replaceBtn = document.getElementById("replace-btn");
    const originalCanvas = document.getElementById("original-canvas");
    const originalContext = originalCanvas.getContext('2d');
    const resultImageContainer = document.getElementById("result-image-container");
    const fileChosen = document.getElementById("file-chosen");
    const thicknessInput = document.getElementById("thickness-input");
    const swapViewToggle = document.getElementById("swap-view-toggle");
    const originalCtx = originalCanvas.getContext("2d");

    const dismissBtn = document.getElementById('dismissBtn');
    const dismissBtns = document.getElementById('dismissBtns');

    const how = document.getElementById('how');
    const start = document.getElementById('start');
    const popovertour = document.querySelector('.popover-tour');

    const back1 = document.querySelector('.back1');
    const next1 = document.getElementById('next1');
    const popovertour1 = document.querySelector('.popover-tour-1');

    const next2 = document.getElementById('next2');
    const back2 = document.querySelector('.back2');
    const popovertour2 = document.querySelector('.popover-tour-2');

    const next3 = document.getElementById('next3');
    const back3 = document.querySelector('.back3');
    const popovertour3 = document.querySelector('.popover-tour-3');

    const next4 = document.getElementById('next4');
    const back4 = document.querySelector('.back4');
    const popovertour4 = document.querySelector('.popover-tour-4');

    const next5 = document.getElementById('next5');
    const back5 = document.querySelector('.back5');
    const popovertour5 = document.querySelector('.popover-tour-5');

    const next6 = document.getElementById('next6');
    const back6 = document.querySelector('.back6');
    const popovertour6 = document.querySelector('.popover-tour-6');

    const next7 = document.getElementById('next7');
    const back7 = document.querySelector('.back7');
    const popovertour7 = document.querySelector('.popover-tour-7');

    const next8 = document.getElementById('next8');
    const back8 = document.querySelector('.back8');
    const popovertour8 = document.querySelector('.popover-tour-8');

    const next9 = document.getElementById('next9');
    const back9 = document.querySelector('.back9');
    const popovertour9 = document.querySelector('.popover-tour-9');

    const next10 = document.getElementById('next10');
    const back10 = document.querySelector('.back10');
    const popovertour10 = document.querySelector('.popover-tour-10');

    const next11 = document.getElementById('next11');
    const back11 = document.querySelector('.back11');
    const popovertour11 = document.querySelector('.popover-tour-11');

    dismissBtn.addEventListener('click', () => {
        popovertour.classList.toggle('d-none');
    });
    dismissBtns.addEventListener('click', () => {
        popovertour1.classList.toggle('d-none');
    });
    how.addEventListener('click', () => {
        popovertour.classList.toggle('d-none');
    });
    start.addEventListener('click', () => {
        popovertour.classList.toggle('d-none');
        popovertour1.classList.toggle('d-none');        
    });
    back1.addEventListener('click', () => {
        popovertour1.classList.toggle('d-none');        
        popovertour.classList.toggle('d-none');
    });
    next1.addEventListener('click', () => {
        popovertour1.classList.toggle('d-none');
        popovertour2.classList.toggle('d-none');        
    });
    back2.addEventListener('click', () => {
        popovertour2.classList.toggle('d-none');
        popovertour1.classList.toggle('d-none');        
    });
    next2.addEventListener('click', () => {
        popovertour2.classList.toggle('d-none');
        popovertour3.classList.toggle('d-none');        
    });
    back3.addEventListener('click', () => {
        popovertour3.classList.toggle('d-none');
        popovertour2.classList.toggle('d-none');        
    });
    next3.addEventListener('click', () => {
        popovertour3.classList.toggle('d-none');
        popovertour4.classList.toggle('d-none');        
    });
    back4.addEventListener('click', () => {
        popovertour4.classList.toggle('d-none');
        popovertour3.classList.toggle('d-none');        
    });
    next4.addEventListener('click', () => {
        popovertour4.classList.toggle('d-none');
        popovertour5.classList.toggle('d-none');        
    });
    back5.addEventListener('click', () => {
        popovertour5.classList.toggle('d-none');
        popovertour4.classList.toggle('d-none');        
    });
    next5.addEventListener('click', () => {
        popovertour5.classList.toggle('d-none');
        popovertour6.classList.toggle('d-none');        
    });
    back6.addEventListener('click', () => {
        popovertour6.classList.toggle('d-none');
        popovertour5.classList.toggle('d-none');        
    });
    next6.addEventListener('click', () => {
        popovertour6.classList.toggle('d-none');
        popovertour7.classList.toggle('d-none');        
    });
    back7.addEventListener('click', () => {
        popovertour7.classList.toggle('d-none');
        popovertour6.classList.toggle('d-none');        
    });
    next7.addEventListener('click', () => {
        popovertour7.classList.toggle('d-none');
        popovertour8.classList.toggle('d-none');        
    });
    back8.addEventListener('click', () => {
        popovertour8.classList.toggle('d-none');
        popovertour7.classList.toggle('d-none');        
    });
    next8.addEventListener('click', () => {
        popovertour8.classList.toggle('d-none');
        popovertour9.classList.toggle('d-none');        
    });
    back9.addEventListener('click', () => {
        popovertour9.classList.toggle('d-none');
        popovertour8.classList.toggle('d-none');        
    });
    next9.addEventListener('click', () => {
        popovertour9.classList.toggle('d-none');
        popovertour10.classList.toggle('d-none');        
    });
    back10.addEventListener('click', () => {
        popovertour10.classList.toggle('d-none');
        popovertour9.classList.toggle('d-none');        
    });
    next10.addEventListener('click', () => {
        popovertour10.classList.toggle('d-none');
        popovertour11.classList.toggle('d-none');        
    });
    back11.addEventListener('click', () => {
        popovertour11.classList.toggle('d-none');
        popovertour.classList.toggle('d-none');  
    });
    next11.addEventListener('click', () => {
        popovertour11.classList.toggle('d-none');     
    });

    let image = new Image();
    let selectedColor = { r: 0, g: 0, b: 0 };

    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                image.src = e.target.result;
                fileChosen.textContent = file.name;
                image.onload = () => {
                    originalCanvas.width = image.width;
                    originalCanvas.height = image.height;
                    originalCtx.drawImage(image, 0, 0);
                    originalCanvas.style.display = "block";
                };
            };
            reader.readAsDataURL(file);
        } else {
            fileChosen.textContent = "No file chosen";
        }
    });

    originalCanvas.addEventListener("click", function (event) {
        const rect = originalCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const pixel = originalContext.getImageData(x, y, 1, 1).data;
        selectedColor = { r: pixel[0], g: pixel[1], b: pixel[2] };
        colorInput.value = rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b);
    });

    replaceBtn.addEventListener("click", function () {
        replaceColor();
    });

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    swapViewToggle.addEventListener("change", function () {
        renderImage();
    });
    swapViewToggle.addEventListener("change", renderImage);

    function renderImage() {
        const swapViewEnabled = swapViewToggle.checked;
        if (swapViewEnabled) {
            showColorSwapAreas();
        } else {
            const resultImg = new Image();
            resultImg.src = originalCanvas.toDataURL();
            resultImageContainer.innerHTML = "";
            resultImageContainer.appendChild(resultImg);
        }
    }

    function replaceColor() {
        const swapViewEnabled = swapViewToggle.checked;
        const originalImageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
        const pixels = originalImageData.data;
        const selectedColor = rgbaToRgb(200, 205, 203, 255); // rgba(200, 205, 203, 255)
        const replacementColor = hexToRgb("#87CEFA"); // lightskyblue
        const tolerance = parseInt(toleranceInput.value);
        const thickness = parseInt(thicknessInput.value);
        const changeTones = toneCheckbox.checked;
        const blendEdges = blendCheckbox.checked;
        const width = originalCanvas.width;

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            if (colorMatch(r, g, b, selectedColor, tolerance)) {
                if (changeTones) {
                    const { r: newR, g: newG, b: newB } = maintainTones({ r, g, b }, replacementColor);
                    pixels[i] = newR;
                    pixels[i + 1] = newG;
                    pixels[i + 2] = newB;
                } else {
                    pixels[i] = replacementColor.r;
                    pixels[i + 1] = replacementColor.g;
                    pixels[i + 2] = replacementColor.b;
                }
                if (blendEdges) {
                    blendEdgeColors(pixels, i, thickness);
                }
            }
        }

        originalCtx.putImageData(originalImageData, 0, 0);

        if (swapViewEnabled) {
            showColorSwapAreas();
        } else {
            const resultImg = new Image();
            resultImg.src = originalCanvas.toDataURL();
            resultImageContainer.innerHTML = "";
            resultImageContainer.appendChild(resultImg);
        }
    }

    function showColorSwapAreas() {
        const originalImageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
        const pixels = originalImageData.data;
        const selectedColor = rgbaToRgb(200, 205, 203, 255); // rgba(200, 205, 203, 255)
        const tolerance = parseInt(toleranceInput.value);

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            if (colorMatch(r, g, b, selectedColor, tolerance)) {
                pixels[i] = 255;
                pixels[i + 1] = 255;
                pixels[i + 2] = 255;
            } else {
                pixels[i] = 0;
                pixels[i + 1] = 0;
                pixels[i + 2] = 0;
            }
        }

        originalCtx.putImageData(originalImageData, 0, 0);
        const swapViewCanvas = document.createElement("canvas");
        swapViewCanvas.width = originalCanvas.width;
        swapViewCanvas.height = originalCanvas.height;
        const swapViewCtx = swapViewCanvas.getContext("2d");
        swapViewCtx.putImageData(originalImageData, 0, 0);
        resultImageContainer.innerHTML = "";
        resultImageContainer.appendChild(swapViewCanvas);
    }

    function colorMatch(r, g, b, color, tolerance) {
        const diffR = Math.abs(r - color.r);
        const diffG = Math.abs(g - color.g);
        const diffB = Math.abs(b - color.b);
        return diffR <= tolerance && diffG <= tolerance && diffB <= tolerance;
    }

 


    function rgbaToRgb(r, g, b, a) {
        // This function is used to convert the provided RGBA color to an RGB format
        return { r, g, b };
    }

    function maintainTones(oldColor, newColor) {
        const avgOld = (oldColor.r + oldColor.g + oldColor.b) / 3;
        const avgNew = (newColor.r + newColor.g + newColor.b) / 3;
        const factor = avgOld / avgNew;
        return {
            r: newColor.r * factor,
            g: newColor.g * factor,
            b: newColor.b * factor
        };
    }

    function blendEdgeColors(pixels, index, width, thickness) {
        const totalPixels = pixels.length;
        const pixelCount = width * 4;
        
        for (let i = index; i < totalPixels; i += 4) {
            if (isEdgePixel(pixels, i, width)) {
                let blendedColor = { r: 0, g: 0, b: 0, count: 0 };
                for (let y = -thickness; y <= thickness; y++) {
                    for (let x = -thickness; x <= thickness; x++) {
                        const neighborIndex = i + (y * pixelCount) + (x * 4);
                        if (neighborIndex >= 0 && neighborIndex < totalPixels) {
                            blendedColor.r += pixels[neighborIndex];
                            blendedColor.g += pixels[neighborIndex + 1];
                            blendedColor.b += pixels[neighborIndex + 2];
                            blendedColor.count++;
                        }
                    }
                }
                pixels[i] = blendedColor.r / blendedColor.count;
                pixels[i + 1] = blendedColor.g / blendedColor.count;
                pixels[i + 2] = blendedColor.b / blendedColor.count;
            }
        }
    }
    
    function isEdgePixel(pixels, index, width) {
        const totalPixels = pixels.length;
        const pixelCount = width * 4;
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                const neighborIndex = index + (y * pixelCount) + (x * 4);
                if (neighborIndex >= 0 && neighborIndex < totalPixels) {
                    const rDiff = Math.abs(pixels[index] - pixels[neighborIndex]);
                    const gDiff = Math.abs(pixels[index + 1] - pixels[neighborIndex + 1]);
                    const bDiff = Math.abs(pixels[index + 2] - pixels[neighborIndex + 2]);
                    if (rDiff > 10 || gDiff > 10 || bDiff > 10) { // Example tolerance for edge detection
                        return true;
                    }
                }
            }
        }
        return false;
    }
    

    // Function to load the sample image and set the required options
    window.loadSampleImage = function () {
        image.src = "Images/LOGO/red-lilies.jpg"; // Replace with the actual path to your sample image
        image.onload = () => {
            originalCanvas.width = image.width;
            originalCanvas.height = image.height;
            originalCtx.drawImage(image, 0, 0);
            originalCanvas.style.display = "block";

            // Automatically set the required options
            colorInput.value = "#c8cdcb"; // rgba(200, 205, 203, 255)
            newColorInput.value = "#87CEFA"; // lightskyblue
            toleranceInput.value = 10; // 10% tolerance
            toneCheckbox.checked = true; // Maintain brightness, saturation, and shadows
            blendCheckbox.checked = true; // Blend edges
            thicknessInput.value = 1; // Color blending line thickness
            swapViewToggle.checked = true; // View color swap areas

            // Perform the color replacement
            replaceColor();
        };
    };
});
// 

//    document.addEventListener("DOMContentLoaded", function () {
//     const fileInput = document.getElementById("file-input");
//     const colorInput = document.getElementById("color-input");
//     const newColorInput = document.getElementById("new-color-input");
//     const toleranceInput = document.getElementById("tolerance-input");
//     const toneCheckbox = document.getElementById("tone-checkbox");
//     const blendCheckbox = document.getElementById("blend-checkbox");
//     const replaceBtn = document.getElementById("replace-btn");
//     const originalCanvas = document.getElementById("original-canvas");
//     const originalContext = originalCanvas.getContext('2d');
//     const resultImageContainer = document.getElementById("result-image-container");
//     const fileChosen = document.getElementById("file-chosen");
//     const thicknessInput = document.getElementById("thickness-input");
//     const thickness = parseInt(thicknessInput.value, 10);
//     const swapViewToggle = document.getElementById("swap-view-toggle");


//     let selectedColor = { r: 0, g: 0, b: 0 };

//     fileInput.addEventListener("change", function () {
//         const file = fileInput.files[0];
//         if (file) {
//             fileChosen.textContent = `File chosen: ${file.name}`;
//             const reader = new FileReader();
//             reader.onload = function (event) {
//                 const img = new Image();
//                 img.onload = function () {
//                     originalCanvas.width = img.width;
//                     originalCanvas.height = img.height;
//                     originalContext.drawImage(img, 0, 0);
//                     originalCanvas.style.display = 'block';
//                 }
//                 img.src = event.target.result;
//             }
//             reader.readAsDataURL(file);
//         } else {
//             fileChosen.textContent = "No file chosen";
//             originalCanvas.style.display = 'none';
//         }
//     });

//     originalCanvas.addEventListener("click", function (event) {
//         const rect = originalCanvas.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;
//         const pixel = originalContext.getImageData(x, y, 1, 1).data;
//         selectedColor = { r: pixel[0], g: pixel[1], b: pixel[2] };
//         colorInput.value = rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b);
//     });

//     replaceBtn.addEventListener("click", function () {
//         const file = fileInput.files[0];
//         const newColor = hexToRgb(newColorInput.value);
//         const tolerance = parseInt(toleranceInput.value, 10);
//         const maintainTones = toneCheckbox.checked;
//         const blendEdges = blendCheckbox.checked;

//         if (file && newColor) {
//             const img = new Image();
//             img.onload = function () {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');
//                 canvas.width = img.width;
//                 canvas.height = img.height;

//                 ctx.drawImage(img, 0, 0);

//                 const imageData = ctx.getImageData(0, 0, img.width, img.height);
//                 const data = imageData.data;

//                 for (let i = 0; i < data.length; i += 4) {
//                     if (isColorWithinTolerance(data[i], data[i + 1], data[i + 2], selectedColor, tolerance)) {
//                         if (maintainTones) {
//                             const hsl = rgbToHsl(data[i], data[i + 1], data[i + 2]);
//                             const newHsl = rgbToHsl(newColor.r, newColor.g, newColor.b);
//                             const blendedHsl = { h: newHsl.h, s: hsl.s, l: hsl.l };
//                             const blendedRgb = hslToRgb(blendedHsl.h, blendedHsl.s, blendedHsl.l);
//                             data[i] = blendedRgb.r;
//                             data[i + 1] = blendedRgb.g;
//                             data[i + 2] = blendedRgb.b;
//                         } else {
//                             data[i] = newColor.r;
//                             data[i + 1] = newColor.g;
//                             data[i + 2] = newColor.b;
//                         }
//                     }
//                 }

//                 if (blendEdges) {
//                     blendColorsAtEdges(data, img.width, img.height);
//                 }

//                 ctx.putImageData(imageData, 0, 0);

//                 const resultImg = new Image();
//                 resultImg.src = canvas.toDataURL();
//                 resultImageContainer.innerHTML = '';
//                 resultImageContainer.appendChild(resultImg);
//             }
//             img.src = URL.createObjectURL(file);
//         } else {
//             alert("Please choose a file and select a color.");
//         }
//     });

//     function hexToRgb(hex) {
//         const bigint = parseInt(hex.slice(1), 16);
//         const r = (bigint >> 16) & 255;
//         const g = (bigint >> 8) & 255;
//         const b = bigint & 255;
//         return { r, g, b };
//     }

//     function rgbToHex(r, g, b) {
//         return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
//     }

//     function isColorWithinTolerance(r, g, b, color, tolerance) {
//         return (
//             Math.abs(r - color.r) <= tolerance &&
//             Math.abs(g - color.g) <= tolerance &&
//             Math.abs(b - color.b) <= tolerance
//         );
//     }

//     function rgbToHsl(r, g, b) {
//         r /= 255, g /= 255, b /= 255;
//         const max = Math.max(r, g, b), min = Math.min(r, g, b);
//         let h, s, l = (max + min) / 2;

//         if (max === min) {
//             h = s = 0;
//         } else {
//             const d = max - min;
//             s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//             switch (max) {
//                 case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//                 case g: h = (b - r) / d + 2; break;
//                 case b: h = (r - g) / d + 4; break;
//             }
//             h /= 6;
//         }
//         return { h, s, l };
//     }

//     function hslToRgb(h, s, l) {
//         let r, g, b;

//         if (s == 0) {
//             r = g = b = l;
//         } else {
//             const hue2rgb = function hue2rgb(p, q, t) {
//                 if (t < 0) t += 1;
//                 if (t > 1) t -= 1;
//                 if (t < 1 / 6) return p + (q - p) * 6 * t;
//                 if (t < 1 / 3) return q;
//                 if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
//                 return p;
//             }

//             const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//             const p = 2 * l - q;
//             r = hue2rgb(p, q, h + 1 / 3);
//             g = hue2rgb(p, q, h);
//             b = hue2rgb(p, q, h - 1 / 3);
//         }

//         return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
//     }

//     function blendColorsAtEdges(data, width, height) {
//         const alpha = 0.5; // Adjust this value to change the blending ratio
//         for (let y = 1; y < height - 1; y++) {
//             for (let x = 1; x < width - 1; x++) {
//                 const i = (y * width + x) * 4;
//                 const neighbors = [
//                     ((y - 1) * width + (x - 1)) * 4,
//                     ((y - 1) * width + x) * 4,
//                     ((y - 1) * width + (x + 1)) * 4,
//                     (y * width + (x - 1)) * 4,
//                     (y * width + (x + 1)) * 4,
//                     ((y + 1) * width + (x - 1)) * 4,
//                     ((y + 1) * width + x) * 4,
//                     ((y + 1) * width + (x + 1)) * 4,
//                 ];

//                 let blendedR = data[i], blendedG = data[i + 1], blendedB = data[i + 2];
//                 for (const n of neighbors) {
//                     blendedR = (1 - alpha) * blendedR + alpha * data[n];
//                     blendedG = (1 - alpha) * blendedG + alpha * data[n + 1];
//                     blendedB = (1 - alpha) * blendedB + alpha * data[n + 2];
//                 }

//                 data[i] = blendedR;
//                 data[i + 1] = blendedG;
//                 data[i + 2] = blendedB;
//             }
//         }
//     }

//     function blendColorsAtEdges(data, width, height) {
//         const alpha = 0.5; // Adjust this value to change the blending ratio
//         const t = thickness;
//         for (let y = t; y < height - t; y++) {
//             for (let x = t; x < width - t; x++) {
//                 const i = (y * width + x) * 4;
//                 const neighbors = [
//                     ((y - 1) * width + (x - 1)) * 4,
//                     ((y - 1) * width + x) * 4,
//                     ((y - 1) * width + (x + 1)) * 4,
//                     (y * width + (x - 1)) * 4,
//                     (y * width + (x + 1)) * 4,
//                     ((y + 1) * width + (x - 1)) * 4,
//                     ((y + 1) * width + x) * 4,
//                     ((y + 1) * width + (x + 1)) * 4,
//                 ];

//                 let blendedR = data[i], blendedG = data[i + 1], blendedB = data[i + 2];
//                 for (const n of neighbors) {
//                     blendedR = (1 - alpha) * blendedR + alpha * data[n];
//                     blendedG = (1 - alpha) * blendedG + alpha * data[n + 1];
//                     blendedB = (1 - alpha) * blendedB + alpha * data[n + 2];
//                 }

//                 data[i] = blendedR;
//                 data[i + 1] = blendedG;
//                 data[i + 2] = blendedB;
//             }
//         }
//     }


//     swapViewToggle.addEventListener("change", function () {
//         renderImage();
//     });

//     const img = document.getElementById("image");
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
    
//     swapViewToggle.addEventListener("change", renderImage);
    
//     function renderImage() {
//         const swapViewEnabled = swapViewToggle.checked;
        
//         if (swapViewEnabled) {
//             // Show color swap areas
//             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//             const pixels = imageData.data;
    
//             for (let i = 0; i < pixels.length; i += 4) {
//                 const r = pixels[i];
//                 const g = pixels[i + 1];
//                 const b = pixels[i + 2];
//                 const alpha = pixels[i + 3];
    
//                 // Perform color swap area visualization
//                 // For example, change pixel color based on swap area condition
    
//                 // Example: Change pixels in color swap area to white
//                 if (r === 255 && g === 0 && b === 0) { // Assuming red is the color to swap
//                     pixels[i] = 255; // Set red channel to maximum
//                     pixels[i + 1] = 255; // Set green channel to maximum
//                     pixels[i + 2] = 255; // Set blue channel to maximum
//                 }
//             }
    
//             ctx.putImageData(imageData, 0, 0);
//             img.src = canvas.toDataURL();
//         } else {
//             // Show original image without color swap areas
//             // Render the image normally
//             img.src = "original_image.jpg"; // Replace "original_image.jpg" with the URL of your original image
//         }
//     }    
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const fileInput = document.getElementById("file-input");
//     const fileChosen = document.getElementById("file-chosen");
//     const originalCanvas = document.getElementById("original-canvas");
//     const originalCtx = originalCanvas.getContext("2d");
//     const resultImageContainer = document.getElementById("result-image-container");
//     const replaceBtn = document.getElementById("replace-btn");

//     const colorInput = document.getElementById("color-input");
//     const newColorInput = document.getElementById("new-color-input");
//     const toleranceInput = document.getElementById("tolerance-input");
//     const toneCheckbox = document.getElementById("tone-checkbox");
//     const blendCheckbox = document.getElementById("blend-checkbox");
//     const thicknessInput = document.getElementById("thickness-input");
//     const swapViewToggle = document.getElementById("swap-view-toggle");

//     let image = new Image();

//     fileInput.addEventListener("change", function () {
//         const file = this.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 image.src = e.target.result;
//                 fileChosen.textContent = file.name;
//                 image.onload = () => {
//                     originalCanvas.width = image.width;
//                     originalCanvas.height = image.height;
//                     originalCtx.drawImage(image, 0, 0);
//                     originalCanvas.style.display = "block";
//                 };
//             };
//             reader.readAsDataURL(file);
//         } else {
//             fileChosen.textContent = "No file chosen";
//         }
//     });

//     replaceBtn.addEventListener("click", function () {
//         replaceColor();
//     });

//     swapViewToggle.addEventListener("change", function () {
//         renderImage();
//     });

//     function renderImage() {
//         const swapViewEnabled = swapViewToggle.checked;
//         if (swapViewEnabled) {
//             showColorSwapAreas();
//         } else {
//             const resultImg = new Image();
//             resultImg.src = originalCanvas.toDataURL();
//             resultImageContainer.innerHTML = "";
//             resultImageContainer.appendChild(resultImg);
//         }
//     }

//     function replaceColor() {
//         const swapViewEnabled = swapViewToggle.checked;
//         const originalImageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
//         const pixels = originalImageData.data;
//         const selectedColor = rgbaToRgb(200, 205, 203, 255); // rgba(200, 205, 203, 255)
//         const replacementColor = hexToRgb("#87CEFA"); // lightskyblue
//         const tolerance = parseInt(toleranceInput.value);
//         const thickness = parseInt(thicknessInput.value);
//         const changeTones = toneCheckbox.checked;
//         const blendEdges = blendCheckbox.checked;
//         const width = originalCanvas.width;

//         for (let i = 0; i < pixels.length; i += 4) {
//             const r = pixels[i];
//             const g = pixels[i + 1];
//             const b = pixels[i + 2];

//             if (colorMatch(r, g, b, selectedColor, tolerance)) {
//                 if (changeTones) {
//                     const { r: newR, g: newG, b: newB } = maintainTones({ r, g, b }, replacementColor);
//                     pixels[i] = newR;
//                     pixels[i + 1] = newG;
//                     pixels[i + 2] = newB;
//                 } else {
//                     pixels[i] = replacementColor.r;
//                     pixels[i + 1] = replacementColor.g;
//                     pixels[i + 2] = replacementColor.b;
//                 }
//                 if (blendEdges) {
//                     blendEdgeColors(pixels, i, thickness);
//                 }
//             }
//         }

//         originalCtx.putImageData(originalImageData, 0, 0);

//         if (swapViewEnabled) {
//             showColorSwapAreas();
//         } else {
//             const resultImg = new Image();
//             resultImg.src = originalCanvas.toDataURL();
//             resultImageContainer.innerHTML = "";
//             resultImageContainer.appendChild(resultImg);
//         }
//     }

//     function showColorSwapAreas() {
//         const originalImageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
//         const pixels = originalImageData.data;
//         const selectedColor = rgbaToRgb(200, 205, 203, 255); // rgba(200, 205, 203, 255)
//         const tolerance = parseInt(toleranceInput.value);

//         for (let i = 0; i < pixels.length; i += 4) {
//             const r = pixels[i];
//             const g = pixels[i + 1];
//             const b = pixels[i + 2];

//             if (colorMatch(r, g, b, selectedColor, tolerance)) {
//                 pixels[i] = 255;
//                 pixels[i + 1] = 255;
//                 pixels[i + 2] = 255;
//             } else {
//                 pixels[i] = 0;
//                 pixels[i + 1] = 0;
//                 pixels[i + 2] = 0;
//             }
//         }

//         originalCtx.putImageData(originalImageData, 0, 0);
//         const swapViewCanvas = document.createElement("canvas");
//         swapViewCanvas.width = originalCanvas.width;
//         swapViewCanvas.height = originalCanvas.height;
//         const swapViewCtx = swapViewCanvas.getContext("2d");
//         swapViewCtx.putImageData(originalImageData, 0, 0);
//         resultImageContainer.innerHTML = "";
//         resultImageContainer.appendChild(swapViewCanvas);
//     }

//     function colorMatch(r, g, b, color, tolerance) {
//         const diffR = Math.abs(r - color.r);
//         const diffG = Math.abs(g - color.g);
//         const diffB = Math.abs(b - color.b);
//         return diffR <= tolerance && diffG <= tolerance && diffB <= tolerance;
//     }

//     function hexToRgb(hex) {
//         const bigint = parseInt(hex.slice(1), 16);
//         const r = (bigint >> 16) & 255;
//         const g = (bigint >> 8) & 255;
//         const b = bigint & 255;
//         return { r, g, b };
//     }

//     function rgbaToRgb(r, g, b, a) {
//         // This function is used to convert the provided RGBA color to an RGB format
//         return { r, g, b };
//     }

//     function maintainTones(oldColor, newColor) {
//         const avgOld = (oldColor.r + oldColor.g + oldColor.b) / 3;
//         const avgNew = (newColor.r + newColor.g + newColor.b) / 3;
//         const factor = avgOld / avgNew;
//         return {
//             r: newColor.r * factor,
//             g: newColor.g * factor,
//             b: newColor.b * factor
//         };
//     }

//     function blendEdgeColors(pixels, index, width, thickness) {
//         const totalPixels = pixels.length;
//         const pixelCount = width * 4;
        
//         for (let i = index; i < totalPixels; i += 4) {
//             if (isEdgePixel(pixels, i, width)) {
//                 let blendedColor = { r: 0, g: 0, b: 0, count: 0 };
//                 for (let y = -thickness; y <= thickness; y++) {
//                     for (let x = -thickness; x <= thickness; x++) {
//                         const neighborIndex = i + (y * pixelCount) + (x * 4);
//                         if (neighborIndex >= 0 && neighborIndex < totalPixels) {
//                             blendedColor.r += pixels[neighborIndex];
//                             blendedColor.g += pixels[neighborIndex + 1];
//                             blendedColor.b += pixels[neighborIndex + 2];
//                             blendedColor.count++;
//                         }
//                     }
//                 }
//                 pixels[i] = blendedColor.r / blendedColor.count;
//                 pixels[i + 1] = blendedColor.g / blendedColor.count;
//                 pixels[i + 2] = blendedColor.b / blendedColor.count;
//             }
//         }
//     }
    
//     function isEdgePixel(pixels, index, width) {
//         const totalPixels = pixels.length;
//         const pixelCount = width * 4;
//         for (let y = -1; y <= 1; y++) {
//             for (let x = -1; x <= 1; x++) {
//                 const neighborIndex = index + (y * pixelCount) + (x * 4);
//                 if (neighborIndex >= 0 && neighborIndex < totalPixels) {
//                     const rDiff = Math.abs(pixels[index] - pixels[neighborIndex]);
//                     const gDiff = Math.abs(pixels[index + 1] - pixels[neighborIndex + 1]);
//                     const bDiff = Math.abs(pixels[index + 2] - pixels[neighborIndex + 2]);
//                     if (rDiff > 10 || gDiff > 10 || bDiff > 10) { // Example tolerance for edge detection
//                         return true;
//                     }
//                 }
//             }
//         }
//         return false;
//     }
    

//     // Function to load the sample image and set the required options
//     window.loadSampleImage = function () {
//         image.src = "Images/LOGO/red-lilies.jpg"; // Replace with the actual path to your sample image
//         image.onload = () => {
//             originalCanvas.width = image.width;
//             originalCanvas.height = image.height;
//             originalCtx.drawImage(image, 0, 0);
//             originalCanvas.style.display = "block";

//             // Automatically set the required options
//             colorInput.value = "#c8cdcb"; // rgba(200, 205, 203, 255)
//             newColorInput.value = "#87CEFA"; // lightskyblue
//             toleranceInput.value = 10; // 10% tolerance
//             toneCheckbox.checked = true; // Maintain brightness, saturation, and shadows
//             blendCheckbox.checked = true; // Blend edges
//             thicknessInput.value = 1; // Color blending line thickness
//             swapViewToggle.checked = true; // View color swap areas

//             // Perform the color replacement
//             replaceColor();
//         };
//     };
// });













// JPG Color Picker 
const canvas = document.getElementById("color-picker");
const ctx = canvas.getContext("2d");
const hueSlider = document.getElementById("hue");

let selectedHue = 0;

hueSlider.addEventListener("input", (e) => {
  selectedHue = e.target.value;
  drawColorPicker();
});

function drawColorPicker() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 360; i++) {
    ctx.fillStyle = `hsl(${i}, 100%, 50%)`;
    ctx.fillRect(i, 0, 1, canvas.height);
  }
  ctx.fillStyle = `hsl(${selectedHue}, 100%, 50%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

drawColorPicker();

class Picker {
    constructor(target, width, height) {
      this.target = target;
      this.width = width;
      this.height = height;
      this.context = target.getContext("2d");
      this.build();
      this.listenForEvents();
    }
  
    build() {
      // Create a Gradient Color (colors change on the width)
      let gradient = this.context.createLinearGradient(0, 0, this.width, 0);
      // Add Color Stops to the Gradient (from 0 to 1)
      gradient.addColorStop(0, "rgb(255, 0, 0)");
      gradient.addColorStop(0.15, "rgb(255, 0, 255)");
      gradient.addColorStop(0.33, "rgb(0, 0, 255)");
      gradient.addColorStop(0.49, "rgb(0, 255, 255)");
      gradient.addColorStop(0.67, "rgb(0, 255, 0)");
      gradient.addColorStop(0.84, "rgb(255, 255, 0)");
      gradient.addColorStop(1, "rgb(255, 0, 0)");
      // Add color picker colors (red, green, blue, yellow...)
      // Render the Color Gradient from the 0's position to the full width and height
      this.context.fillStyle = gradient;
      this.context.fillRect(0, 0, this.width, this.height);
    }
  
    listenForEvents() {
      let isMouseDown = false;
      const onMouseDown = (e) => {
        let currentX = e.clientX - this.target.offsetLeft;
        let currentY = e.clientY - this.target.offsetTop;
        if (currentX >= 0 && currentX <= this.width && currentY >= 0 && currentY <= this.height) {
          isMouseDown = true;
        }
      };
  
      const onMouseMove = (e) => {
        if (isMouseDown) {
          let currentX = e.clientX - this.target.offsetLeft;
          let currentY = e.clientY - this.target.offsetTop;
          // Update the picker circle position
          this.context.fillStyle = "white";
          this.context.beginPath();
          this.context.arc(currentX, currentY, 10, 0, 2 * Math.PI);
          this.context.fill();
        }
      };
  
      const onMouseUp = () => {
        isMouseDown = false;
      };
  
      this.target.addEventListener("mousedown", onMouseDown);
      this.target.addEventListener("mousemove", onMouseMove);
      this.target.addEventListener("mouseup", onMouseUp);
    }
  }
  
  const picker = new Picker(document.getElementById("color-picker"), 250, 220);
  picker.draw();

