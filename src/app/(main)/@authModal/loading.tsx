const Loading = () => {
   return (
      <section
         style={{
            top: 0,
            left: 0,
            zIndex: 1000,
            width: '99vw',
            height: '100vh',
            overflow: 'hidden',
            position: 'absolute',
            backdropFilter: 'blur(8px)',
            backgroundColor: '#000000b3',
         }}
      >
         Loading...
      </section>
   );
};

export default Loading;
