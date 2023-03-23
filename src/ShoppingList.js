import Item from "./Item"

export default function ShoppingList(props) {
    return props.items.map(item => <Item 
                                        item={item} 
                                        key={item.id} 
                                        toggleItem={() => props.toggleItem(item.id)} 
                                    />
                            )
}