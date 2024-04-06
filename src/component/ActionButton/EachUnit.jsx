import React, { Children } from 'react'

export default function EachUnit({ render, items }) {
    return Children.toArray(items.map((item, index) => render(item, index)))
}
