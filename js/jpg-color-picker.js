document.addEventListener("DOMContentLoaded", function (){
    const imageInput = document.querySelector("#image-select");
    const imagePreview = document.querySelector("#image-preview");
    const pickerBtn = document.querySelector(".open-picker");
    const coordPickerBtn = document.querySelector(".pick-from-coordinates");
    const result = document.querySelector("#result");
    const radiusInput = document.querySelector("#radius-input");
    const coordXInput = document.querySelector("#coord-x-input");
    const coordYInput = document.querySelector("#coord-y-input");
    const colorFormatSelect = document.querySelector("#color-format");
    const highlightCanvas = document.querySelector("#highlight-canvas");
    const highlightCtx = highlightCanvas.getContext("2d");
    const offerMessage = document.getElementById('offerMessage');
    const learn = document.getElementById('learn');
    
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
   

    if (!window.EyeDropper) {
        alert("Your browser does not support this feature.");
    }

    const eyedropper = new EyeDropper();

    imageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.classList.add("active");
            };
            reader.readAsDataURL(file);
        }
    });

    imagePreview.addEventListener("click", function (event) {
        const radius = parseInt(radiusInput.value, 10);
        const rect = imagePreview.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);
        pickColorAtCoordinates(x, y, radius);
    });

    pickerBtn.addEventListener("click", function () {
        result.classList.add("show");

        eyedropper.open()
            .then(res => {
                const radius = parseInt(radiusInput.value, 10);
                if (radius > 1) {
                    averageColorAroundPixel(res.sRGBHex, radius, res.x, res.y);
                } else {
                    displayColor(res.sRGBHex);
                }
            })
            .catch(err => {
                console.log("User cancelled the selection");
            });
    });

    coordPickerBtn.addEventListener("click", function () {
        const radius = parseInt(radiusInput.value, 10);
        const x = parseInt(coordXInput.value, 10);
        const y = parseInt(coordYInput.value, 10);

        if (x >= 0 && y >= 0) {
            pickColorAtCoordinates(x, y, radius);
        }
    });

    function pickColorAtCoordinates(x, y, radius) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = imagePreview;

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        if (radius > 1) {
            averageColorAroundPixel(null, radius, x, y, ctx);
        } else {
            const pixelData = ctx.getImageData(x, y, 1, 1).data;
            const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
            displayColor(color);
        }
    }

    function averageColorAroundPixel(color, radius, x, y, ctx = null) {
        const canvas = document.createElement("canvas");
        const img = imagePreview;

        if (!ctx) {
            ctx = canvas.getContext("2d");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
        }

        let r = 0, g = 0, b = 0, count = 0;

        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                const pixelData = ctx.getImageData(x + dx, y + dy, 1, 1).data;
                r += pixelData[0];
                g += pixelData[1];
                b += pixelData[2];
                count++;
            }
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const averagedColor = `rgb(${r}, ${g}, ${b})`;
        displayColor(averagedColor);

        highlightCanvas.width = img.width;
        highlightCanvas.height = img.height;
        highlightCanvas.style.display = 'block';
        highlightCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);
        highlightCtx.strokeStyle = 'green';
        highlightCtx.lineWidth = 2;
        highlightCtx.beginPath();
        highlightCtx.arc(x, y, radius, 0, 2 * Math.PI);
        highlightCtx.stroke();
    }

    function displayColor(color) {
        const format = colorFormatSelect.value;
        const rgb = color.match(/\d+/g);
        const [r, g, b] = rgb.map(Number);
        const a = rgb.length > 3 ? Number(rgb[3]) : 255;
        const hex = rgbToHex(r, g, b);
        const rgba = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        const hsl = rgbToHsl(r, g, b);
        const hsv = rgbToHsv(r, g, b);
        const hsi = rgbToHsi(r, g, b);
        const lab = rgbToLab(r, g, b);
        const lch = rgbToLch(lab);
        const hcl = lchToHcl(lch);
        let output = '';

        switch (format) {
            case 'color-name':
                output = `Color Name: ${getColorName(hex)}`;
                break;
            case 'none':
                output = '';
                break;
            case 'closest-name':
                output = `Closest Color Name: ${getClosestColorName(hex)}`;
                break;
            case 'hex':
                output = `Hex: ${hex}`;
                break;
            case 'rgb':
                output = `RGB: rgb(${r}, ${g}, ${b})`;
                break;
            case 'rgba':
                output = `RGBA: ${rgba}`;
                break;
            case 'hsl':
                output = `HSL: ${hsl}`;
                break;
            case 'hsv':
                output = `HSV: ${hsv}`;
                break;
            case 'hsi':
                output = `HSI: ${hsi}`;
                break;
            case 'lab':
                output = `LAB: ${lab}`;
                break;
            case 'lch':
                output = `LCH: ${lch}`;
                break;
            case 'hcl':
                output = `HCL: ${hcl}`;
                break;
            default:
                output = `Hex: ${hex}`;
        }

        result.innerHTML = `Picked Color: <b>${output}</b>`;
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    function rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsv(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
    }

    function rgbToHsi(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let intensity = (r + g + b) / 3;
        let min = Math.min(r, g, b);
        let saturation = intensity === 0 ? 0 : 1 - (min / intensity);
        let hue = Math.acos((0.5 * ((r - g) + (r - b))) / Math.sqrt((r - g) * (r - g) + (r - b) * (g - b))) * (180 / Math.PI);
        if (b > g) {
            hue = 360 - hue;
        }
        return `hsi(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(intensity * 100)}%)`;
    }

    function rgbToLab(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        let x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        let y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        let z = r * 0.0193 + g * 0.1192 + b * 0.9505;
        x = x / 0.95047;
        y = y / 1.00000;
        z = z / 1.08883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
        let l = (116 * y) - 16;
        let a = 500 * (x - y);
        let B = 200 * (y - z);
        return `lab(${Math.round(l)}, ${Math.round(a)}, ${Math.round(B)})`;
    }

    function rgbToLch(lab) {
        let [l, a, b] = lab.match(/\d+/g).map(Number);
        let c = Math.sqrt(a * a + b * b);
        let h = Math.atan2(b, a) * (180 / Math.PI);
        if (h < 0) h += 360;
        return `lch(${Math.round(l)}, ${Math.round(c)}, ${Math.round(h)})`;
    }

    function lchToHcl(lch) {
        let [l, c, h] = lch.match(/\d+/g).map(Number);
        return `hcl(${Math.round(h)}, ${Math.round(c)}, ${Math.round(l)})`;
    }

    function getColorName(hex) {
        // Placeholder for getting the color name. Implementation needed.
        return 'Sample Color Name';
    }

    function getClosestColorName(hex) {
        // Placeholder for getting the closest color name. Implementation needed.
        return 'Closest Sample Color Name';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.querySelector("#image-select");
    const imagePreview = document.querySelector("#image-preview");
    const pickerBtn = document.querySelector(".open-picker");
    const coordPickerBtn = document.querySelector(".pick-from-coordinates");
    const result = document.querySelector("#result");
    // const results = document.querySelector("#results");
    const radiusInput = document.querySelector("#radius-input");
    const coordXInput = document.querySelector("#coord-x-input");
    const coordYInput = document.querySelector("#coord-y-input");
    const highlightCanvas = document.querySelector("#highlight-canvas");
    const highlightCtx = highlightCanvas.getContext("2d");

    if (!window.EyeDropper) {
        alert("Your browser does not support this feature.");
    }

    const eyedropper = new EyeDropper();

    imageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.classList.add("active");
            };
            reader.readAsDataURL(file);
        }
    });

    imagePreview.addEventListener("click", function (event) {
        const radius = parseInt(radiusInput.value, 10);
        const rect = imagePreview.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);
        pickColorAtCoordinates(x, y, radius);
    });

    pickerBtn.addEventListener("click", function () {
        result.classList.add("show");

        eyedropper.open()
            .then(res => {
                const radius = parseInt(radiusInput.value, 10);
                if (radius > 1) {
                    averageColorAroundPixel(res.sRGBHex, radius, res.x, res.y);
                } else {
                    displayColor(res.sRGBHex);
                }
            })
            .catch(err => {
                console.log("User cancelled the selection");
            });
    });

    coordPickerBtn.addEventListener("click", function () {
        const radius = parseInt(radiusInput.value, 10);
        const x = parseInt(coordXInput.value, 10);
        const y = parseInt(coordYInput.value, 10);

        if (x >= 0 && y >= 0) {
            pickColorAtCoordinates(x, y, radius);
        }
    });

    function pickColorAtCoordinates(x, y, radius) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = imagePreview;

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        if (radius > 1) {
            averageColorAroundPixel(null, radius, x, y, ctx);
        } else {
            const pixelData = ctx.getImageData(x, y, 1, 1).data;
            const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
            displayColor(color);
        }
    }

    function averageColorAroundPixel(color, radius, x, y, ctx = null) {
        const canvas = document.createElement("canvas");
        const img = imagePreview;

        if (!ctx) {
            ctx = canvas.getContext("2d");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
        }

        let r = 0, g = 0, b = 0, count = 0;

        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                const pixelData = ctx.getImageData(x + dx, y + dy, 1, 1).data;
                r += pixelData[0];
                g += pixelData[1];
                b += pixelData[2];
                count++;
            }
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const averagedColor = `rgb(${r}, ${g}, ${b})`;
        displayColor(averagedColor);

        highlightCanvas.width = img.width;
        highlightCanvas.height = img.height;
        highlightCanvas.style.display = 'block';
        highlightCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);
        highlightCtx.strokeStyle = 'green';
        highlightCtx.lineWidth = 2;
        highlightCtx.beginPath();
        highlightCtx.arc(x, y, radius, 0, 2 * Math.PI);
        highlightCtx.stroke();
    }

    function displayColor(color) {
        const rgb = color.match(/\d+/g);
        const [r, g, b] = rgb.map(Number);
        const a = rgb.length > 3 ? Number(rgb[3]) : 255;
        const hex = rgbToHex(r, g, b);
        const rgba = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        const hsl = rgbToHsl(r, g, b);
        const hsv = rgbToHsv(r, g, b);
        const hsi = rgbToHsi(r, g, b);
        const lab = rgbToLab(r, g, b);
        const lch = rgbToLch(lab);
        const hcl = lchToHcl(lch);

        result.innerHTML = `
            <p class="mt-10">Picked Color:</p>
            <ul>
                <li class="list-style-none">Name: ${getColorName(hex)}</li>
                <li class="list-style-none">Hex: ${hex}</li>
                <li class="list-style-none">RGB: rgb(${r}, ${g}, ${b})</li>
                <li class="list-style-none">RGBA: ${rgba}</li>
                <li class="list-style-none">HSL: ${hsl}</li>
                <li class="list-style-none">HSV: ${hsv}</li>
                <li class="list-style-none">HSI: ${hsi}</li>
                <li class="list-style-none">LAB: ${lab}</li>
                <li class="list-style-none">LCH: ${lch}</li>
                <li class="list-style-none">HCL: ${hcl}</li>
            </ul>
        `;
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    }

    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    function rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsv(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
    }

    function rgbToHsi(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let intensity = (r + g + b) / 3;
        let min = Math.min(r, g, b);
        let saturation = intensity === 0 ? 0 : 1 - (min / intensity);
        let hue = Math.acos((0.5 * ((r - g) + (r - b))) / Math.sqrt((r - g) * (r - g) + (r - b) * (g - b))) * (180 / Math.PI);
        if (b > g) {
            hue = 360 - hue;
        }
        return `hsi(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(intensity * 100)}%)`;
    }

    function rgbToLab(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        let x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        let y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        let z = r * 0.0193 + g * 0.1192 + b * 0.9505;
        x = x / 0.95047;
        y = y / 1.00000;
        z = z / 1.08883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
        let l = (116 * y) - 16;
        let a = 500 * (x - y);
        let bb = 200 * (y - z);
        return `lab(${Math.round(l)}, ${Math.round(a)}, ${Math.round(bb)})`;
    }

    function rgbToLch(lab) {
        let [l, a, bb] = lab.match(/\d+/g).map(Number);
        let c = Math.sqrt(a * a + bb * bb);
        let h = Math.atan2(bb, a) * (180 / Math.PI);
        if (h < 0) h += 360;
        return `lch(${Math.round(l)}, ${Math.round(c)}, ${Math.round(h)})`;
    }

    function lchToHcl(lch) {
        let [l, c, h] = lch.match(/\d+/g).map(Number);
        return `hcl(${Math.round(h)}, ${Math.round(c)}, ${Math.round(l)})`;
    }

    function getColorName(hex) {
        // Placeholder for getting the color name. Implementation needed.
        return 'Sample Color Name';
    }

    function getClosestColorName(hex) {
        // Placeholder for getting the closest color name. Implementation needed.
        return 'Closest Sample Color Name';
    }
});