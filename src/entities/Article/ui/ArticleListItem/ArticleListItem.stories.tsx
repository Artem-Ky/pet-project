import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Article, ArticleView } from 'entities/Article/model/types/article';
import testAvatar from 'app/testAvatar.jpg';
import { ArticleListItem } from './ArticleListItem';

export default {
    title: 'entities/Article/ArticleListItem',
    component: ArticleListItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleListItem>;

const Template: StoryFn<typeof ArticleListItem> = (args) => (
    <ArticleListItem {...args} />
);

const article = {
    id: '1',
    title: 'Javascript news Javascript news Javascript news Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: testAvatar,
    views: 102200000,
    createdAt: '26.02.2022',
    type: ['IT', 'some tags', 'and other tags'],
    user: {
        id: '1',
        username: 'cat',
        avatar: testAvatar,
    },
    blocks: [
        {
            id: '1',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
        {
            id: '4',
            type: 'CODE',
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
        },
    ],
} as Article;

export const LightPlate = Template.bind({});
LightPlate.args = {
    view: ArticleView.PLATE,
    article,
};

export const DarkPlate = Template.bind({});
DarkPlate.args = {
    view: ArticleView.PLATE,
    article,
};
DarkPlate.decorators = [ThemeDecorator(Theme.DARK)];

export const LightList = Template.bind({});
LightList.args = {
    view: ArticleView.LIST,
    article,
};

export const DarkList = Template.bind({});
DarkList.args = {
    view: ArticleView.LIST,
    article,
};
DarkList.decorators = [ThemeDecorator(Theme.DARK)];
