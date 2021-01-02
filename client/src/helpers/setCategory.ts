import { IGoodListState } from 'company-app';

export default function getCategory(categoryTitle: string, setGoodListState: Function) {
  fetch(`/get-category?category=${categoryTitle}`)
    .then(response => response.json())
    .then(result => {
      setGoodListState((prev: IGoodListState) => {
        return { ...prev, category: result[0]._id };
      });
    })
    .catch(e => console.log(e.message));
}