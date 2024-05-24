export default function PaginationLi({item, pageActive, colorActive, color, bgColor, bgColorActive, clickHandlerPagination}) {
    return (
        <li key={item} className={`pagination-item ${pageActive === item + 1 ? 'pagination-item-disable' : ''}`} style={{ color: pageActive === item + 1 ? colorActive : color, backgroundColor: pageActive === item + 1 ? bgColorActive : bgColor }} onClick={() => clickHandlerPagination(item + 1)}>
            <p>{item + 1}</p>
        </li>
    )
}