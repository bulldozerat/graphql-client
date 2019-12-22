import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PetsList from '../components/PetsList';
import NewPetModal from '../components/NewPetModal';
import Loader from '../components/Loader';

const query = gql`
  query Test {
    pets {
      id
      type
      name
      owner {
        id
        username
      }
      img
      createdAt
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, loading, error } = useQuery(query);
  const wholeQuery = useQuery(query);
  if (error) console.log(error);
  console.log('wholeQuery: ', wholeQuery);

  console.log('data: ', data);

  const onSubmit = input => {
    setModal(false);
  };

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className='page pets-page'>
      <section>
        <div className='row betwee-xs middle-xs'>
          <div className='col-xs-10'>
            <h1>Pets</h1>
          </div>

          <div className='col-xs-2'>
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>{data && <PetsList pets={data.pets} />}</section>
    </div>
  );
}
