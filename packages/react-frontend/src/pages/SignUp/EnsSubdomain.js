import { Button, Input } from '@windmill/react-ui';
import { useStateMachine } from 'little-state-machine';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/form/Error';
import HeaderNavigator from '../../components/header-navigator/HeaderNavigator';
import useEnsResolver from '../../hooks/useEnsResolver';
import useQuery from '../../hooks/useQuery';
import useSignupSubmit from '../../hooks/useSignupSubmit';
import { updateSignupInfo } from './updateAction';
import { ethers } from 'ethers';
import { notifyError, notifySuccess } from '../../utils/toast';

const EnsSubdomain = () => {
  const BASE_SUBDOMAIN = 'redletter.eth';

  const [ensCreated, setEnsCreated] = useState(false);
  const [ensCreateLoading, setEnsCreateLoading] = useState(false);

  const query = useQuery();
  const { actions, state } = useStateMachine({ updateSignupInfo });

  const { handleSubmit, errors, loading, getValues, setValue, control } =
    useSignupSubmit(state);

  const { getAddressfromENS, wrapSubdomain } = useEnsResolver();

  const [resolved, setResolved] = useState(null);

  const navigate = useNavigate();

  const onClickCreateBtnWrap = async () => {
    try {
      setEnsCreateLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const to = accounts[0];
      const subdomain = getValues('ens');

      await wrapSubdomain(subdomain, to);

      // Disable Create Button
      setEnsCreated(true);

      setEnsCreateLoading(false);

      notifySuccess('ENS Successfully Minted!');
    } catch (err) {
      notifyError(err);
      setEnsCreateLoading(false);
    }
  };

  const onSubmit = (data) => {
    actions.updateSignupInfo(data);
    navigate(`/signup/set-location?step=${parseInt(query.get('step')) + 1}`);
  };

  const onChangeEns = async (e, onChange) => {
    const value = e.target.value;
    const fullDomain = value + '.redletter.eth';
    onChange(value);

    if (!value || value === '') {
      return;
    }

    const address = await getAddressfromENS(fullDomain);
    if (address) {
      setResolved(true);
    } else {
      setResolved(false);
    }
  };

  return (
    <div className="p-4">
      <HeaderNavigator back />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col h-full space-y-10">
          <div className="">
            <img src={`/step4-${query.get('step')}.svg`} />
          </div>

          <div className="text-2xl font-bold mb-2">
            Get your <br />
            RedLetter Subdomain
          </div>

          <div className="flex flex-col items-center my-12">
            <div className="flex items-center space-x-2 w-full">
              <Controller
                control={control}
                name="ens"
                render={({ field: { value, onChange } }) => (
                  <Input
                    onChange={(e) => onChangeEns(e, onChange)}
                    value={value}
                    className="border h-10 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
                  />
                )}
              />
              <span className="text-gray-500">.redletter.eth</span>
            </div>

            <Error errorName={errors.ens} />
            {resolved !== null ? (
              !resolved ? (
                <div className="text-success text-sm mt-2">
                  This domain is available{' '}
                </div>
              ) : (
                <div className="text-danger text-sm mt-2">
                  This domain is not available{' '}
                </div>
              )
            ) : (
              <></>
            )}
          </div>

          <div>
            <Button
              onClick={() => onClickCreateBtnWrap()}
              disabled={ensCreated || ensCreateLoading}
              className="mt-4 h-12 w-full"
              block
            >
              {ensCreated ? 'Created' : ensCreateLoading ? 'Wait...' : 'Create'}
            </Button>
            <Button
              type="submit"
              disabled={ensCreateLoading}
              className="mt-4 h-12 w-full"
              block
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnsSubdomain;
