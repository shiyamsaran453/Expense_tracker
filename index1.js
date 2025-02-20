class expense_calculator {
    constructor(Description, Amount, category) {
        this.Description = Description;
        this.Amount = Amount;
        this.category = category;
    }

    categorize() {
        const label = document.createElement('label');
        label.textContent = `${this.Description}: `;
        const crt_span = document.createElement('span');
        crt_span.textContent = `${this.Amount}$`;
        const hr = document.createElement('hr');
        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.classList.add('btn', 'btn-secondary');
        button.addEventListener('click', () => {
            this.delete_expense(label, crt_span, button, hr);
        });

        let categoryElement;
        if (this.category === 'Food') {
            categoryElement = document.getElementsByClassName('category')[0];
            this.calculate_total(1, this.Amount);
        } else if (this.category === 'Transportation') {
            categoryElement = document.getElementsByClassName('category')[1];
            this.calculate_total(2, this.Amount);
        } else if (this.category === 'Entertainment') {
            categoryElement = document.getElementsByClassName('category')[2];
            this.calculate_total(3, this.Amount);
        } else {
            categoryElement = document.getElementsByClassName('category')[3];
            this.calculate_total(4, this.Amount);
        }

        categoryElement.appendChild(label);
        categoryElement.appendChild(crt_span);
        categoryElement.appendChild(button);
        categoryElement.append(hr);
    }

    calculate_total(cat_sel, amount) {
        if (!this.constructor.total) {
            this.constructor.total = 0;
            this.constructor.food_total = 0;
            this.constructor.transport_total = 0;
            this.constructor.enter_total = 0;
            this.constructor.others_total = 0;
        }

        this.constructor.total += amount;

        if (cat_sel === 1) {
            this.constructor.food_total += amount;
            document.getElementById('food-total').innerText = `${this.constructor.food_total}$`;
        } else if (cat_sel === 2) {
            this.constructor.transport_total += amount;
            document.getElementById('transportation-total').innerText = `${this.constructor.transport_total}$`;
        } else if (cat_sel === 3) {
            this.constructor.enter_total += amount;
            document.getElementById('entertainment-total').innerText = `${this.constructor.enter_total}$`;
        } else {
            this.constructor.others_total += amount;
            document.getElementById('others-total').innerText = `${this.constructor.others_total}$`;
        }

        document.getElementById('total-expenses').innerText = `${this.constructor.total}$`;
    }

    delete_expense(label, crt_span, button, hr) {
        const categoryElement = label.parentElement;
        categoryElement.removeChild(label);
        categoryElement.removeChild(crt_span);
        categoryElement.removeChild(button);
        categoryElement.removeChild(hr);

        this.update_totals(-this.Amount);
    }

    update_totals(amount) {
        this.constructor.total += amount;

        if (this.category === 'Food') {
            this.constructor.food_total += amount;
            document.getElementById('food-total').innerText = `${this.constructor.food_total}$`;
        } else if (this.category === 'Transportation') {
            this.constructor.transport_total += amount;
            document.getElementById('transportation-total').innerText = `${this.constructor.transport_total}$`;
        } else if (this.category === 'Entertainment') {
            this.constructor.enter_total += amount;
            document.getElementById('entertainment-total').innerText = `${this.constructor.enter_total}$`;
        } else {
            this.constructor.others_total += amount;
            document.getElementById('others-total').innerText = `${this.constructor.others_total}$`;
        }

        document.getElementById('total-expenses').innerText = `${this.constructor.total}$`;
    }
}

function get_value(event) {
    event.preventDefault();
    const descriptionInput = document.getElementById('des');
    const amountInput = document.getElementById('exampleInputPassword1');
    const categoryInput = document.getElementById('category');

    const Description = descriptionInput.value.trim();
    const Amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    const exp_cal = new expense_calculator(Description, Amount, category);
    exp_cal.categorize();

    descriptionInput.value = '';
    amountInput.value = '';
    categoryInput.value =  'Food';
}