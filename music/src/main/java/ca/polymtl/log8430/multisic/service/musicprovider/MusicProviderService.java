package ca.polymtl.log8430.multisic.service.musicprovider;

import ca.polymtl.log8430.multisic.domain.Track;

import java.util.List;

/**
 * This interface refer to the required method to connect to different streaming music APIs
 *
 */
public interface MusicProviderService {

	/**
	 * search method to query the corresponding streaming API
	 *
	 * @param query : term to query the streaming API
	 * @return resulted tracks
	 */
    List<Track> search(String query);

    /**
     * To get all available streaming provider string
     *
     * @return array of string corresponding to provider name
     */
    String getProviderName();
}
