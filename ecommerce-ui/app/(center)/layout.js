export const metadata = {
  title: 'AddProduct',
  description: 'Product',
};

const AddProductLayout = ({ children }) => {
  return (
    <div className={'h-screen w-full flex justify-center items-center'}>
      {children}
    </div>
  );
};

export default AddProductLayout;
