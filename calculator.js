 /* =========================
      calculator made for carb counting lessons not for reuse. Made for and by Learn Diabetes, Just for Learn Diabetes!
    ========================= */


(function () {

    /* =========================
       CALCULATOR BUTTON
    ========================= */

    const button = document.createElement("button");

    button.className = "ld-calc-button";

    button.innerHTML =
        '<i class="fa-solid fa-calculator"></i>';

    document.body.appendChild(button);


    /* =========================
       CALCULATOR
    ========================= */

    const calculator = document.createElement("div");

    calculator.className = "ld-calculator";

    calculator.innerHTML = `

        <input
            class="ld-calc-display"
            id="ldCalcDisplay"
            readonly
        >

        <div class="ld-calc-keys">

            <button class="function" data-value="clear">AC</button>
            <button class="function" data-value="back">⌫</button>
            <button class="function" data-value="%">%</button>
            <button class="operator" data-value="/">÷</button>

            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>
            <button class="operator" data-value="*">×</button>

            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>
            <button class="operator" data-value="-">−</button>

            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button class="operator" data-value="+">+</button>

            <button class="zero" data-value="0">0</button>
            <button data-value=".">.</button>
            <button class="operator" data-value="=">=</button>

        </div>
    `;

    document.body.appendChild(calculator);


    /* =========================
       STYLES
    ========================= */

    const style = document.createElement("style");

    style.textContent = `

    .ld-calc-button {
        position: fixed;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 58px;
        height: 58px;
        border: 0;
        border-radius: 50%;
        background: #48b8b2;
        color: white;
        font-size: 25px;
        cursor: pointer;
        z-index: 9998;
        box-shadow: 0 3px 8px rgba(0,0,0,.18);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ld-calc-button:active {
        transform: translateY(-50%) scale(.94);
    }


    .ld-calculator {
        position: fixed;
        width: 270px;
        padding: 12px;

        background: #1c1c1e;

        border-radius: 18px;

        box-shadow:
            0 10px 35px rgba(0,0,0,.35);

        z-index: 9999;

        display: none;

        user-select: none;
        touch-action: none;
    }


    .ld-calc-display {
        width: 100%;
        height: 60px;

        border: 0;
        border-radius: 10px;

        background: #3a3a3c;

        color: white;

        font-family: Arial, sans-serif;
        font-size: 29px;

        text-align: right;

        padding: 5px 12px;

        margin-bottom: 10px;

        outline: none;
    }


    .ld-calc-keys {
        display: grid;

        grid-template-columns:
            repeat(4, 1fr);

        gap: 7px;
    }


    .ld-calculator button {
        height: 50px;

        border: 0;
        border-radius: 50%;

        background: #505050;

        color: white;

        font-family: Arial, sans-serif;

        font-size: 19px;

        cursor: pointer;
    }


    .ld-calculator button:active {
        filter: brightness(1.3);
        transform: scale(.94);
    }


    .ld-calculator .operator {
        background: #ff9500;
    }


    .ld-calculator .function {
        background: #a5a5a5;
        color: #111;
    }


    .ld-calculator .zero {
        grid-column: span 2;
        border-radius: 28px;
        text-align: left;
        padding-left: 21px;
    }


    @media (max-width:600px) {

        .ld-calc-button {
            left: 10px;

            width: 52px;
            height: 52px;

            font-size: 22px;
        }

        .ld-calculator {
            width: 255px;
        }

        .ld-calculator button {
            height: 47px;
        }

    }

    `;

    document.head.appendChild(style);


    /* =========================
       ELEMENTS
    ========================= */

    const display =
        document.getElementById("ldCalcDisplay");


    /* =========================
       OPEN / CLOSE
    ========================= */

    button.onclick = function () {

        if (
            calculator.style.display === "block"
        ) {

            calculator.style.display = "none";

            return;
        }


        calculator.style.display = "block";

        positionCalculator();

    };


    function positionCalculator() {

        const rect =
            button.getBoundingClientRect();

        const width =
            calculator.offsetWidth;

        let x =
            rect.right + 18;

        let y =
            rect.top - 20;


        if (
            x + width >
            window.innerWidth
        ) {

            x =
                window.innerWidth -
                width -
                10;

        }


        if (x < 10) {
            x = 10;
        }


        if (y < 10) {
            y = 10;
        }


        if (
            y + calculator.offsetHeight >
            window.innerHeight - 10
        ) {

            y =
                window.innerHeight -
                calculator.offsetHeight -
                10;

        }


        calculator.style.left =
            x + "px";

        calculator.style.top =
            y + "px";

        calculator.style.transform =
            "none";

    }


    /* =========================
       CALCULATOR FUNCTIONS
    ========================= */

    calculator
        .querySelectorAll("button")
        .forEach(key => {

            key.addEventListener(
                "click",
                function () {

                    const value =
                        this.dataset.value;


                    if (value === "clear") {

                        display.value = "";

                        return;
                    }


                    if (value === "back") {

                        display.value =
                            display.value.slice(0, -1);

                        return;
                    }


                    if (value === "%") {

                        if (display.value) {

                            display.value =
                                parseFloat(
                                    display.value
                                ) / 100;

                        }

                        return;
                    }


                    if (value === "=") {

                        calculate();

                        return;
                    }


                    display.value += value;

                }
            );

        });


    function calculate() {

        try {

            if (!display.value) {
                return;
            }


            /*
             * Only allow normal
             * mathematical characters.
             */

            if (
                !/^[0-9+\-*/.() ]+$/
                .test(display.value)
            ) {

                display.value = "Error";

                return;
            }


            const result =
                Function(
                    '"use strict";return (' +
                    display.value +
                    ')'
                )();


            if (
                typeof result !== "number" ||
                !Number.isFinite(result)
            ) {

                display.value = "Error";

                return;
            }


            display.value =
                String(
                    Math.round(
                        result * 100000
                    ) / 100000
                );

        } catch {

            display.value = "Error";

        }

    }


    /* =========================
       KEYBOARD
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                calculator.style.display !== "block"
            ) {
                return;
            }


            if (
                "0123456789+-*/()."
                .includes(event.key)
            ) {

                display.value += event.key;

            }


            if (event.key === "Enter") {

                calculate();

            }


            if (event.key === "Backspace") {

                display.value =
                    display.value.slice(0, -1);

            }


            if (event.key === "Escape") {

                calculator.style.display =
                    "none";

            }

        }
    );


    /* =========================
       DRAGGING
    ========================= */

    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;


    function startDrag(x, y) {

        const rect =
            calculator.getBoundingClientRect();

        dragging = true;

        offsetX =
            x - rect.left;

        offsetY =
            y - rect.top;

    }


    function moveDrag(x, y) {

        if (!dragging) {
            return;
        }


        let newX =
            x - offsetX;

        let newY =
            y - offsetY;


        const maxX =
            window.innerWidth -
            calculator.offsetWidth;

        const maxY =
            window.innerHeight -
            calculator.offsetHeight;


        newX =
            Math.max(
                5,
                Math.min(
                    newX,
                    maxX - 5
                )
            );


        newY =
            Math.max(
                5,
                Math.min(
                    newY,
                    maxY - 5
                )
            );


        calculator.style.left =
            newX + "px";

        calculator.style.top =
            newY + "px";

        calculator.style.transform =
            "none";

    }


    /* PC */

    calculator.addEventListener(
        "mousedown",
        function (event) {

            if (
                event.target.closest("button") ||
                event.target === display
            ) {
                return;
            }


            startDrag(
                event.clientX,
                event.clientY
            );

        }
    );


    document.addEventListener(
        "mousemove",
        function (event) {

            moveDrag(
                event.clientX,
                event.clientY
            );

        }
    );


    document.addEventListener(
        "mouseup",
        function () {

            dragging = false;

        }
    );


    /* MOBILE */

    calculator.addEventListener(
        "touchstart",
        function (event) {

            if (
                event.target.closest("button") ||
                event.target === display
            ) {
                return;
            }


            const touch =
                event.touches[0];


            startDrag(
                touch.clientX,
                touch.clientY
            );

        },
        { passive: true }
    );


    document.addEventListener(
        "touchmove",
        function (event) {

            if (!dragging) {
                return;
            }


            const touch =
                event.touches[0];


            moveDrag(
                touch.clientX,
                touch.clientY
            );

        },
        { passive: true }
    );


    document.addEventListener(
        "touchend",
        function () {

            dragging = false;

        }
    );

})();
