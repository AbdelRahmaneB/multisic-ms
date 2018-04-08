package ca.polymtl.log8430.multisic.musicprovider.service.provider.spotify;

import ca.polymtl.log8430.multisic.model.domain.TrackModel;
import ca.polymtl.log8430.multisic.musicprovider.service.provider.MusicProviderService;
import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.SpotifyApi;

import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchTracksRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

/**
 * Service class for managing Spotify API.
 */
@Service
class SpotifyProviderService implements MusicProviderService {

    private final Logger log = LoggerFactory.getLogger(SpotifyProviderService.class);
    private static final String MUSIC_PROVIDER_NAME = "spotify"; //$NON-NLS-1$

    private static final String clientId = "22e646a7995548b99c0288315abf7fa5"; //$NON-NLS-1$
    private static final String clientSecret = "2356b09d4aa44490a5ef50bf03d269e2"; //$NON-NLS-1$

    private static final SpotifyTrackTransformer spotifyTrackTransformer = new SpotifyTrackTransformer();
    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
        .setClientId(clientId)
        .setClientSecret(clientSecret)
        .build();

    private static final ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
        .build();

	private void setAccessToken() {
		try {
			final Future<ClientCredentials> clientCredentialsFuture = clientCredentialsRequest.executeAsync();

			final ClientCredentials clientCredentials = clientCredentialsFuture.get();

			// Set access token for further "spotifyApi" object usage
			spotifyApi.setAccessToken(clientCredentials.getAccessToken());

			log.info("The Access Token Expires in : '{}' s", clientCredentials.getExpiresIn()); //$NON-NLS-1$

		} catch (InterruptedException | ExecutionException e) {
			log.error("Couldn't get an Access Token : ", e); //$NON-NLS-1$
		}
	}

    @Override
    public List<TrackModel> search(String query) {
        if(spotifyApi.getAccessToken() == null){
            setAccessToken();
        }

        List<TrackModel> tracks;

        try {
            final SearchTracksRequest searchTracksRequest = spotifyApi.searchTracks(query)
                .market(CountryCode.CA)
                .limit(10)
                .offset(0)
                .build();

            final Future<Paging<com.wrapper.spotify.model_objects.specification.Track>> pagingFuture = searchTracksRequest.executeAsync();

            tracks = Arrays.stream(pagingFuture.get().getItems())
            	.filter(t -> t.getPreviewUrl() != null)
                .map(spotifyTrackTransformer::transform)
                .collect(Collectors.toList());

        } catch (InterruptedException | ExecutionException e) {
        	tracks = new ArrayList<>();
            log.error("Error when searching for query : '{}' : ", query, e); //$NON-NLS-1$
        }

        return tracks;
    }

    @Override
    public String getProviderName() {
        return MUSIC_PROVIDER_NAME;
    }
}
