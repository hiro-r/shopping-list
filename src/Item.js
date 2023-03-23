export default function Item(props) {
    return(
        <div className="item-in">
            <label>
                <input 
                    type="checkbox" 
                    checked={props.item.completed}
                    onClick={props.toggleItem}
                    readOnly
                />
                {props.item.name}
            </label>
        </div>
    )
}