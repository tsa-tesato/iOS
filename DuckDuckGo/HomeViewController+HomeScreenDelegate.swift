//
//  HomeViewController+HomeScreenDelegate.swift
//  DuckDuckGo
//
//  Copyright © 2019 DuckDuckGo. All rights reserved.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

import Foundation
import UIKit

extension HomeViewController: HomeScreenTipsDelegate {
    
    func showPrivateSearchTip(didShow: @escaping (Bool) -> Void) {

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            guard let self = self,
                !self.omniBarTextFieldHasFocus,
                let superView = self.parent?.view else {
                didShow(false)
                return
            }
            
            let view: UIView!
            if self.isCenteredSearch {
                view = self.collectionView.centeredSearch
            } else {
                view = self.chromeDelegate?.omniBar
            }
            
            guard view != nil else {
                didShow(false)
                return
            }
                    }
        
    }
    
    private var omniBarTextFieldHasFocus: Bool {
        return self.chromeDelegate?.omniBar.textField.isFirstResponder ?? false
    }
    
    private var isCenteredSearch: Bool {
        return HomePageConfiguration().components.contains(where: {
            if case .centeredSearch = $0 { return true }
            return false
        })
    }
    
    func showCustomizeTip(didShow: @escaping (Bool) -> Void) {
    }
 
    func installHomeScreenTips() {
        HomeScreenTips(delegate: self)?.trigger()
    }
    
}
