import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import Button from "./Button";

describe('Button', () => {
    test('Deve renderizar botão com texto', () => {
        render(<Button onClick={() => {}}>Btn</Button>)

        const btn = screen.getByRole('button', {name: 'Btn'})
        expect(btn).toBeInTheDocument()
    })

    test('Deve renderizar usando a classe Button--secondary por padrão', () => {
        render(<Button onClick={() => {}}>Btn</Button>)

        expect(screen.getByRole('button', {name: 'Btn'})).toHaveClass('Button--secondary')
    })

    test('Deve renderizar usando a classe Button--primary se for botão primário', () => {
        render(<Button onClick={() => {}} type="primary" >Btn</Button>)

        expect(screen.getByRole('button', {name: 'Btn'})).toHaveClass('Button--primary')
    })

    test('Deve renderizar usando a classe Button--primary se for botão de ícone', () => {
        render(<Button onClick={() => {}} type="icon" >Btn</Button>)

        expect(screen.getByRole('button', {name: 'Btn'})).toHaveClass('Button--icon')
    })

    test('Deve chamar onClick ao clicar no botão', () => {
        const onClick = jest.fn()
        render(<Button onClick={onClick}>Btn</Button>)

        fireEvent.click(screen.getByRole('button', {name: 'Btn'}))

        expect(onClick).toHaveBeenCalled()
    })
})