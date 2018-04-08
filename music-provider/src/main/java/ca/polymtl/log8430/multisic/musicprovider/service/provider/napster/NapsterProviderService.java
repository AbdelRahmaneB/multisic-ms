package ca.polymtl.log8430.multisic.musicprovider.service.provider.napster;

import ca.polymtl.log8430.multisic.model.domain.TrackModel;
import ca.polymtl.log8430.multisic.musicprovider.service.provider.MusicProviderService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.github.kaiwinter.rhapsody.api.RhapsodySdkWrapper;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class for managing Napster API.
 */
@Service
class NapsterProviderService implements MusicProviderService {

	private final Logger log = LoggerFactory.getLogger(NapsterProviderService.class);
	private static final String MUSIC_PROVIDER_NAME = "napster"; //$NON-NLS-1$
	private static final int DEFAULT_SEARCH_LIMIT = 10;
	
	private static final String API_KEY = "YzdjNjAyNjYtZDEyNC00MzY5LTg4M2EtM2IwNWY4YmJlMTkx"; //$NON-NLS-1$
	private static final String API_SECRET = "ZTZlZmRjMzctMzk4NC00ZmZiLWFlNDQtNDZkYjYyNjBhYTg4"; //$NON-NLS-1$

	private static final NapsterTrackTransformer napsterTrackTransformer = new NapsterTrackTransformer();
	private static final RhapsodySdkWrapper rhapsodySdkWrapper =  new RhapsodySdkWrapper(API_KEY, API_SECRET, null);

    @Override
    public List<TrackModel> search(String query) {
        Collection<com.github.kaiwinter.rhapsody.model.AlbumData.Track> napsterTracks = 
        		rhapsodySdkWrapper.searchTrack(query, DEFAULT_SEARCH_LIMIT);
		
		List<TrackModel> tracks = Optional.ofNullable(napsterTracks)
                .orElseGet(Collections::emptyList)
				.stream()
				.map(napsterTrackTransformer::transform)
				.collect(Collectors.toList());
		
        return tracks;
    }

    @Override
    public String getProviderName() {
        return MUSIC_PROVIDER_NAME;
    }
}
