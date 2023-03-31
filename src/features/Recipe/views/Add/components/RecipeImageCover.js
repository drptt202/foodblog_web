import React, {Component} from "react";

class RecipeImageCover extends Component {
    render() {
        const {image} = this.props
        return (
            <div className="recipe-image-cover">
                <img src={image}/>
            </div>
        );
    }
}

export default RecipeImageCover