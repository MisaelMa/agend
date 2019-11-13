import {Module, VuexModule, MutationAction} from "vuex-module-decorators";

interface Article {
    title: string;
    body: string;
    published: boolean;
    meta: {
        [key: string]: string;
    };
}

const articles = [
    {
        title: "Hello World!",
        body: "This is a sample article.",
        published: true,
        meta: {}
    },
    {
        title: "My writing career continues!",
        body: `...but I've run out of things to say.`,
        published: false,
        meta: {}
    }
];

@Module({
    name: "articles",
    stateFactory: true,
    namespaced: true
})
export default class ArticlesModule extends VuexModule {
    articles: Article[] = [
        {
            title: "Initial article",
            body:
                "This is the starting point, before we initialize the article store.",
            published: true,
            meta: {}
        }
    ];

    get publishedArticles() {
        return this.articles.filter(article => article.published);
    }

    @MutationAction({mutate: ["articles"]})
    async initializeArticles() {
        return {articles};
    }
}
