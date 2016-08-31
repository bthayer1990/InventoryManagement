var NewOrderItemSubmission = React.createClass({
    render: function(){
        return(
            <input type="button" className="btn btn-success btn-lg" value="Add to Order" />
        );
    }
});

var NewOrderItemTotal = React.createClass({
    render: function(){
        return(
            <label className="totalLabel">Total: ${this.props.total}</label>
        );
    }
});

var NewOrderItemFooter = React.createClass({
    render: function(){
        return(
            <div className="form-inline">
                <div className="form-group">
                    <NewOrderItemTotal total={this.props.total} />
                </div>
                <div className="form-group inlineLeftMargin">
                    <NewOrderItemSubmission />
                </div>
            </div>
        );
    }
});

var CheckboxOption = React.createClass({
    handleChange: function() {
        this.props.onSelection(
            this.refs.option.value,
            this.refs.option.checked
        );
    },
    render: function() {
        return(
            <label className="checkbox-inline">
                <input type="checkbox" value={this.props.value} ref="option" checked={this.props.selected} onChange={this.handleChange} />{this.props.value}
            </label>
        );
    }
});

var CheckBoxOptionHeader = React.createClass({
    render: function() {
        return(
            <div>
                <br/>
                <h4>{this.props.text}</h4>
            </div>
        );
    }
});

var PizzaCreatorCheckboxSection = React.createClass({
    handleChange: function(selection, checked) {
        this.props.onSelection(selection, checked);
    },
    render: function() {
        var checkboxOptionComponents = [];
        var selectedOptions = this.props.selectedOptions;
        var handleChangeEvent = this.handleChange;
        var lastType = null;
        this.props.options.forEach(function(option) {
            if (option.type !== lastType) {
                checkboxOptionComponents.push(<CheckBoxOptionHeader text={option.type} />);
            }
            var selected = false;
            if(selectedOptions.filter(function(item){return (item.value == option.value);}).length > 0){
                selected = true;
            }
            checkboxOptionComponents.push(<CheckboxOption value={option.value} selected={selected} onSelection={handleChangeEvent} />);
            lastType = option.type;
        }.bind(this));
        return(
            <div>
                <h3>{this.props.section}</h3>
                <div className="optionsContainer">
                    {checkboxOptionComponents}
                </div>
            </div>
        );
    }
});

var RadioOption = React.createClass({
    handleChange: function() {
        this.props.onSelection(
            this.refs.option.value
        );
    },
    render: function() {
        return(
            <label className="radio-inline">
                <input type="radio" name={this.props.section} value={this.props.value} ref="option" checked={this.props.selected} onChange={this.handleChange} />{this.props.value}
            </label>
        );
    }
});

var PizzaCreatorRadioButtonSection = React.createClass({
    handleChange: function(selection) {
        this.props.onSelection(selection);
    },
    render: function() {
        var radioOptionComponents = [];
        var section = this.props.section;
        var selectedOption = this.props.selectedOption;
        var handleChangeEvent = this.handleChange;
        this.props.options.forEach(function(option) {
            var selected = false;
            if(selectedOption.value == option.value){
                selected = true;
            }
            radioOptionComponents.push(<RadioOption section={section} value={option.value} selected={selected} onSelection={handleChangeEvent} />);    
        });
        return(
            <div>
                <h3>{this.props.section}</h3>
                <div className="optionsContainer">
                    {radioOptionComponents}
                </div>
            </div>
        );
    }
});

var PizzaCreatorNewOrderItemContent = React.createClass({
    //TODO: get sizes, crusts, sauces, and toppings from API
    //TODO: post selected data
    //TODO: calculate total based on selections
    getInitialState: function() {
        return {
            selectedSize: {},
            selectedCrust: {},
            selectedSauce: {},
            selectedCheese: {},
            selectedToppings: [],
            total: 0
        };
    },
    handleSizeSelection: function(selectedSizeValue) {
        var selectedSizes = SIZES.filter(function(item){return (item.value == selectedSizeValue);});
        this.setState({
            selectedSize: selectedSizes[0]
        });
    },
    handleCrustSelection: function(selectedCrustValue) {
        var selectedCrusts = CRUSTS.filter(function(item){return (item.value == selectedCrustValue);});
        this.setState({
            selectedCrust: selectedCrusts[0]
        });
    },
    handleSauceSelection: function(selectedSauceValue) {
        var selectedSauces = SAUCES.filter(function(item){return (item.value == selectedSauceValue);});
        this.setState({
            selectedSauce: selectedSauces[0]
        });
    },
    handleCheeseSelection: function(selectedCheeseValue) {
        var selectedCheeses = CHEESES.filter(function(item){return (item.value == selectedCheeseValue);});
        this.setState({
            selectedCheese: selectedCheeses[0]
        });
    },
    handleToppingSelection: function(selectedToppingValue, checked) {
        var stateSelectedToppings = this.state.selectedToppings;
        if (checked) {
            var selectedToppings = TOPPINGS.filter(function(item){return (item.value == selectedToppingValue);});
            stateSelectedToppings.push(selectedToppings[0]);
        }
        else {
            for(var i = 0; i < stateSelectedToppings.length; i++){
                if(stateSelectedToppings[i].value == selectedToppingValue){
                    stateSelectedToppings.splice(i, 1);
                }
            }
        }
        this.setState({
            selectedToppings: stateSelectedToppings
        });
    },
    calculateTotal: function() {
        var total = 0;
        if(this.state.selectedSize.price){
            total += this.state.selectedSize.price;
        }
        return total;
    },
    handleSubmit: function() {

    },
    render: function() {
        var total = this.calculateTotal();
        return(
            <div>
                <h1 className="text-center">Pizza Creator</h1>
                <PizzaCreatorRadioButtonSection section="Size" options={SIZES} selectedOption={this.state.selectedSize} onSelection={this.handleSizeSelection} /><hr/>
                <PizzaCreatorRadioButtonSection section="Crust" options={CRUSTS} selectedOption={this.state.selectedCrust} onSelection={this.handleCrustSelection} /><hr/>
                <PizzaCreatorRadioButtonSection section="Sauce" options={SAUCES} selectedOption={this.state.selectedSauce} onSelection={this.handleSauceSelection} /><hr/>
                <PizzaCreatorRadioButtonSection section="Cheese" options={CHEESES} selectedOption={this.state.selectedCheese} onSelection={this.handleCheeseSelection} /><hr/>
                <PizzaCreatorCheckboxSection section="Toppings" options={TOPPINGS} selectedOptions={this.state.selectedToppings} onSelection={this.handleToppingSelection} /><br/><hr/>
                <NewOrderItemFooter total={total}/>
            </div>
        );
    }
});

var SIZES = [
    {value: 'small', price: 5.00},
    {value: 'medium', price: 10.00},
    {value: 'large', price: 15.00},
    {value: 'extra large', price: 20.00}
]

var CRUSTS = [
    {value: 'hand-tossed'},
    {value: 'deep dish'},
    {value: 'thin'}
]

var SAUCES = [
    {value: 'marinara'},
    {value: 'bbq'},
    {value: 'ranch'},
    {value: 'buffalo'}
]

var CHEESES = [
    {value: 'yes'},
    {value: 'no'}
]

var TOPPINGS = [
    {type: 'Meat', value: 'pepperoni'},
    {type: 'Meat', value: 'sausage'},
    {type: 'Meat', value: 'bacon'},
    {type: 'Meat', value: 'canadian bacon'},
    {type: 'Meat', value: 'hamburger'},
    {type: 'Meat', value: 'steak'},
    {type: 'Veggie', value: 'peppers'},
    {type: 'Veggie', value: 'onions'},
    {type: 'Veggie', value: 'olives'},
    {type: 'Veggie', value: 'spinach'},
    {type: 'Veggie', value: 'mushrooms'},
    {type: 'Veggie', value: 'garlic'}
]

var NewOrderItemContent = React.createClass({
    render: function() {
        return(
            <div>
                <PizzaCreatorNewOrderItemContent />
            </div>
        );
    }
});

var NewOrderItem = React.createClass({
    render: function() {
        return (
            <div>
                <NewOrderItemContent />
            </div>
        );
    }
});

ReactDOM.render(
    <NewOrderItem />,
    document.getElementById('container')
);