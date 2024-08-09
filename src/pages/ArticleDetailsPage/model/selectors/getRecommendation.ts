import { StateSchema } from 'app/providers/StoreProvider';

// eslint-disable-next-line max-len
export const getArticleRecommendationsIsLoading = (state: StateSchema) => state.articleDetailsRecommendations?.isLoading;

export const getArticleRecommendationsError = (state: StateSchema) => state.articleDetailsRecommendations?.error;
