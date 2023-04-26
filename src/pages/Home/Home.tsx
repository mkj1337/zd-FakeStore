// styles
import './Home.scss';

// components
import { Category } from '../../components/Category/Category';
import { Banner } from '../../components/Banner/Banner';
import { SingleProduct } from '../../components/SingleProduct/SingleProduct';
import { Faq } from '../../components/Faq/Faq';
import { useProductContext } from '../../context/ProductContext';

const faqs = [
  {
    title: '1',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    title: '2',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    title: '3',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
];

export const Home = () => {
  const { isLoading, products } = useProductContext();

  return (
    <div className="wrapper">
      <Banner />
      <Category />
      <main className="home__main">
        {isLoading ? (
          <span>loading...</span>
        ) : (
          <div className="product__container">
            {products.length &&
              products.map((product) => (
                <SingleProduct key={product.id} product={product} />
              ))}
          </div>
        )}
        <Faq faqs={faqs} />
      </main>
    </div>
  );
};
