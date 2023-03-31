import React, {Component} from 'react';
import {DataEmpty} from "@layouts";
import {Col, Row, Avatar} from 'antd';

import BadgeImageDefault from "@images/recipe-default.jpg"
import {CheckCircleFilled} from '@ant-design/icons';
import helpers from "@ultis/helpers";

class RecipeFilter extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            selected: [],
        }
    }*/

    /*onSelectBadge = (e) => {
        let id         = e.currentTarget.dataset.id ?? null
        id             = id ? id : null
        let {selected} = this.state
        const idx      = selected.indexOf(id);
        if (idx !== -1) {
            selected.splice(idx, 1);
        } else {
            selected.push(id)
        }
        this.setState({
            ...this.state,
            selected: selected
        })
    }*/

    render() {
        const {
                  loading,
                  filterItems,
                  title,
                  ingredientSelected,
                  onSelectedIngredient
              } = this.props

        return (
            <div className="recipe-filter">
                <div className="title">
                    {title}
                </div>
                <div className="items">
                    <Row gutter={12}>
                        {
                            loading === false && filterItems.length === 0 ?
                                <DataEmpty title="Không có nguyên liệu."/> : null
                        }
                        {
                            (filterItems.length ?
                                filterItems.map((item, i) => {
                                    return (
                                        <Col span={3} key={i}>
                                            <div
                                                className={"badge-selections" + (ingredientSelected === item.ingredientId ? " selected" : "")}
                                                onClick={onSelectedIngredient}
                                                data-id={item.name}
                                            >
                                                <div className="badge-icon">
                                                    {
                                                        ingredientSelected === item.ingredientId ?
                                                            <Avatar
                                                                size="small"
                                                                icon={<CheckCircleFilled style={{color: "#23b123"}}/>}
                                                            />
                                                            :
                                                            <Avatar
                                                                size="small"
                                                                src={<img src={helpers.generateFullImage(item.image) ?? BadgeImageDefault}
                                                                          alt=""/>}
                                                            />
                                                    }
                                                </div>
                                                <div className="badge-text">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }) : null)
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default RecipeFilter;