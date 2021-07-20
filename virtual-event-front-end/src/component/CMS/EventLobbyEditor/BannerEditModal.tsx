import React, {
  FC,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const StyledModel = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ModelContent = styled.div`
  width: 100%;
  max-width: 760px;
  background-color: white;
  padding: 16px;
`;

interface Banner {
  id: string;
  bannerContainerId: string;
  type: string;
  src: string;
  redirectUrl: string;
  externalLink: boolean;
}

interface BannerEditModalProps {
  banner: any;
  setSelectedBanner: any;
  bannerContainerId: string;
  setBanners: (prev: any) => any;
  eventId: string;
}

const typeOptions = ['IMAGE', 'VIDEO', 'IFRAME'];

const BannerEditModal: FC<BannerEditModalProps> = ({
  banner,
  bannerContainerId,
  setSelectedBanner,
  setBanners,
  eventId,
}) => {
  const [type, setType] = useState(banner.type);
  const [src, setSrc] = useState(banner.src);
  const [redirectUrl, setRedirectUrl] = useState(banner.redirectUrl);
  const [externalLink, setExternalLink] = useState(banner.externalLink);
  const [externalLinkRedirectUrl, setExternalLinkRedirectUrl] = useState(banner.externalLinkRedirectUrl);
  const [isUpdateing, setIsUpdateing] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateBanner = useCallback(async () => {
    setIsUpdateing(true);
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.net/banner?banner_container_id=${bannerContainerId}&banner_id=${banner.id}`, {
      type,
      src,
      redirectUrl,
      externalLink,
      externalLinkRedirectUrl,
    })
      .then(({ data }) => {
        if (data.success) {
          setSuccess(true);
          setBanners((prev: Banner[]) => (
            prev.map((prevBanner: Banner) => {
              if (prevBanner.id === banner.id) {
                return {
                  ...prevBanner,
                  type,
                  src,
                  redirectUrl,
                  externalLink,
                  externalLinkRedirectUrl,
                } as Banner;
              }
              return prevBanner;
            })
          ));
          console.log(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsUpdateing(false);
      });
  }, [
    banner,
    bannerContainerId,
    externalLink,
    redirectUrl,
    src,
    type,
    setBanners,
    externalLinkRedirectUrl,
  ]);

  return (
    <StyledModel
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={!!banner}
      onClose={() => setSelectedBanner(null)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={!!banner}>
        <ModelContent>
          <Select
            fullWidth
            value={type}
            label="Banner Type"
            onChange={({ target: { value } }) => setType(value)}
          >
            {typeOptions.map((option: string) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            value={src}
            label="Src"
            onChange={({ target: { value } }) => setSrc(value)}
          />
          <FormControlLabel
            control={(
              <Switch
                checked={externalLink}
                onChange={({ target: { checked } }) => setExternalLink(checked)}
                color="primary"
              />
              )}
            label="External Link"
          />
          {externalLink ? (
            <TextField
              fullWidth
              value={externalLinkRedirectUrl}
              label="Redirect Url"
              onChange={({ target: { value } }) => {
                setExternalLinkRedirectUrl(value);
              }}
            />
          ) : (
            <div>
              {`${document.location.hostname}/events/${eventId}/`}
              <TextField
                fullWidth
                value={redirectUrl}
                label="Redirect Url"
                onChange={({ target: { value } }) => {
                  setRedirectUrl(value);
                }}
              />
            </div>
          )}
          <Button
            disabled={isUpdateing}
            color="primary"
            variant="contained"
            onClick={updateBanner}
          >
            Save
          </Button>
          {success && <div>Success</div>}
        </ModelContent>
      </Fade>
    </StyledModel>
  );
};

export default BannerEditModal;
