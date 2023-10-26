import React from 'react';
import ReactDOM from 'react-dom/client';


export default function HelloReact() {
    return (
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Vasco</th>
                </tr>
            </table>

        </div>
    );
}

const container = document.getElementById('hello-react');
const root = ReactDOM.createRoot(container);
root.render(<HelloReact />);