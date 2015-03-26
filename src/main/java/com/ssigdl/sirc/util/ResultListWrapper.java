package com.ssigdl.sirc.util;

import java.util.Collection;

public class ResultListWrapper<T> {
    private Long totalPages;
    private Collection<T> resultCollection;
    
	public ResultListWrapper() {}
    
	public ResultListWrapper(Long totalPages, Collection<T> resultCollection) {
		super();
		this.totalPages = totalPages;
		this.resultCollection = resultCollection;
	}
	
	public Long getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(Long totalPages) {
		this.totalPages = totalPages;
	}
	public Collection<T> getResultCollection() {
		return resultCollection;
	}
	public void setResultCollection(Collection<T> resultCollection) {
		this.resultCollection = resultCollection;
	}
}