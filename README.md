## Реализация игры сапер на React

## Правила игры

Игровое поле - прямоугольник из клеток. В начале игры все клетки "закрыты" - на них ничего нет. В начале игры мины проставляются случайным образом под клетки, не показываясь игроку

Игрок может кликом левой кнопки мыши на любую неоткрытую клетку открыть ее, правила открытия клеток:

- Если в клетке мина, то игрок проигрывает
- Если в соседних 8 клетках относительно исходной есть хотя бы одна мина, то клетка покажет число мин в этих клетках
- Цифра должна иметь цвет, зависящий от числа мин вокруг: 1 — синяя, 2 — зелёная, 3 — красная, 4 — тёмно-синяя 5 — коричневая 6 — бирюзовая 7 — чёрная 8 — белая
- Если первые два условия не выполнены, то клетка автоматически открывает все восемь клеток вокруг себя и остаются пустой. Так клетки должны открываться, пока не дойдут до границы игрового поля либо не наткнутся на клетки, под которыми будут цифры

Игрок может поставить метку на неоткрытую клетку правой кнопкой мыши. Доступные метки: "флажок", "вопросик" и без метки, меняются циклически

Если все поля либо открыты, либо помечены флажками, а на счетчике 0, то игрок побеждает
