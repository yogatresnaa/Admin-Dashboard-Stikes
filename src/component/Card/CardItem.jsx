import React from "react";

export default function CardItem({ onClick, text, logo }) {
  return (
    <div
      className="card-item d-flex flex-column justify-content-between align-items-center px-3 py-2"
      aria-label="Card"
      role="button"
      onClick={onClick}
    >
      {logo}
      <p className="m-0">{text}</p>
    </div>
  );
}
